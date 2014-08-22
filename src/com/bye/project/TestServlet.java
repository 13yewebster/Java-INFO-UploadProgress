package com.bye.project;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Iterator;
import java.util.List;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileItemFactory;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

public class TestServlet extends HttpServlet {

	private static final long serialVersionUID = 97987982739182731L;
//	public static final long MAX_UPLOAD_IN_MEGS = 50;

	public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
		doPost(request, response);
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
		response.setContentType("text/html");
		PrintWriter out = response.getWriter();

		out.println("Hello<br/>");

		boolean isMultipartContent = ServletFileUpload.isMultipartContent(request);
		if (!isMultipartContent) {
			out.println("You are not trying to upload<br/>");
			return;
		}
		out.println("You are trying to upload<br/>");

		FileItemFactory factory = new DiskFileItemFactory();
		ServletFileUpload upload = new ServletFileUpload(factory);
//		upload.setSizeMax(MAX_UPLOAD_IN_MEGS * 1024 * 1024);

		TestProgressListener testProgressListener = new TestProgressListener();
		upload.setProgressListener(testProgressListener);

		HttpSession session = request.getSession();
		session.setAttribute("testProgressListener", testProgressListener);

		String filePath = "/Users/ByeWebster/Desktop/TempFiles";
		File uploadedFile = null;
		try {
			List<FileItem> fields = upload.parseRequest(request);
			out.println("Number of fields: " + fields.size() + "<br/><br/>");
			Iterator<FileItem> it = fields.iterator();
			if (!it.hasNext()) {
				out.println("No fields found");
				return;
			}
			out.println("<table border=\"1\">");
			while (it.hasNext()) {
				out.println("<tr>");
				FileItem fileItem = it.next();
				boolean isFormField = fileItem.isFormField();
				if (isFormField) {
					out.println("<td>regular form field</td><td>FIELD NAME: " + fileItem.getFieldName() +
							"<br/>STRING: " + fileItem.getString()
							);
					out.println("</td>");
				} else {


		        	if (fileItem.getSize() > 0) {
						// Create new File object
						uploadedFile = new File(filePath, fileItem.getName());

						try {

								// Write the uploaded file to the system
								fileItem.write(uploadedFile);

							} catch (Exception e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
					}

		            fileItem.delete();

					out.println("<td>file form field</td><td>FIELD NAME: " + fileItem.getFieldName() +
//							"<br/>STRING: " + fileItem.getString() +
							"<br/>NAME: " + fileItem.getName() +
							"<br/>CONTENT TYPE: " + fileItem.getContentType() +
							"<br/>SIZE (BYTES): " + fileItem.getSize() +
							"<br/>TO STRING: " + fileItem.toString()
							);
						out.println("</td>");
				}
				out.println("</tr>");
			}
			out.println("</table>");
			out.println(testProgressListener.getMessage());
		} catch (FileUploadException e) {
			out.println("Error: " + e.getMessage());
			e.printStackTrace();
		}
	}
}
