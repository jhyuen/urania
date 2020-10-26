package com.amazonaws.lambda.demo;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.RequestHandler;

import snippetSystem.db.SnippetDAO;
import snippetSystem.model.Snippet;

import java.util.UUID;

public class CreateSnippetHandler implements RequestHandler<CreateRequest, CreateResponse> {
	
	LambdaLogger logger;
	
	boolean createSnippet () throws Exception {
		if (logger != null) { logger.log("in createSnippet"); }
		SnippetDAO dao = new SnippetDAO();
		
		// check if generated snippet UUID exists
		String newUUID = UUID.randomUUID().toString();
		Snippet exist = dao.getSnippet(newUUID);
		if (exist == null) {
			Snippet snippet = new Snippet(newUUID);
		} else {
			return false;
		}
	}

//    @Override
//    public CreateResponse handleRequest(CreateRequest req, Context context) {
//        logger = context.getLogger();
//        logger.log("Trying to create a new snippet!");
//        logger.log(req.toString());
//
//        // TODO: implement your handler
//        return "Hello from Lambda!";
//    }

}
