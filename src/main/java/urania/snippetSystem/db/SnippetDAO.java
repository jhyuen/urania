package urania.snippetSystem.db;

import java.sql.*;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import com.amazonaws.services.lambda.runtime.LambdaLogger;

import urania.snippetSystem.model.Snippet;

/**
 * Snippet Data Access Object
 * 
 * Note that CAPITALIZATION matters regarding the table name. If you create with 
 * a capital "Constants" then it must be "Constants" in the SQL queries.
 * 
 * @author urania
 *
 */
public class SnippetDAO { 

	java.sql.Connection conn;
	
	final String tblName = "UraniaSchema.Snippet";   // Exact capitalization

    public SnippetDAO () {
    	try  {
    		conn = DatabaseUtil.connect();
    	} catch (Exception e) {
    		conn = null;
    	}
    }

    public Snippet getSnippet(String uuid) throws Exception {
        try {
            Snippet snippet = null;
            PreparedStatement ps = conn.prepareStatement("SELECT * FROM " + tblName + " WHERE snippetId=?;");
            ps.setString(1,  uuid);
            ResultSet resultSet = ps.executeQuery();
            
            while (resultSet.next()) {
                snippet = generateSnippet(resultSet);
            }
            resultSet.close();
            ps.close();
            
            return snippet;

        } catch (Exception e) {
        	e.printStackTrace();
            throw new Exception("Failed in finding the snippet: " + e.getMessage());
        }
    }
    
    public boolean updateSnippetInfo (Snippet snippet) throws Exception {
//        try {
//        	String query = "UPDATE " + tblName + " SET value=? WHERE name=?;";
//        	PreparedStatement ps = conn.prepareStatement(query);
//            ps.setDouble(1, constant.value);
//            ps.setString(2, constant.name);
//            int numAffected = ps.executeUpdate();
//            ps.close();
//            
//            return (numAffected == 1);
//        } catch (Exception e) {
//            throw new Exception("Failed to update report: " + e.getMessage());
//        }
		return false;
    }
    
    public boolean deleteSnippet (Snippet snippet) throws Exception {
//        try {
//            PreparedStatement ps = conn.prepareStatement("DELETE FROM " + tblName + " WHERE name = ?;");
//            ps.setString(1, constant.name);
//            int numAffected = ps.executeUpdate();
//            ps.close();
//            
//            return (numAffected == 1);
//
//        } catch (Exception e) {
//            throw new Exception("Failed to insert constant: " + e.getMessage());
//        }
    	return false;
    }


    public boolean createSnippet (Snippet snippet) throws Exception {
        try {
            PreparedStatement ps = conn.prepareStatement("SELECT * FROM " + tblName + " WHERE snippetId = ?;");
            ps.setString(1, snippet.snippetID);
            ResultSet resultSet = ps.executeQuery();
            
            // already present?
            while (resultSet.next()) {
                //Constant c = generateConstant(resultSet);
                resultSet.close();
                return false;
            }

            ps = conn.prepareStatement("INSERT INTO " + tblName + " (snippetId,snippetText,snippetInfo,timeStamp,languageSelected,viewerPassword,viewerPasswordStatus) values(?,?,?,?,?,?,?);");
            ps.setString(1,  snippet.snippetID);
            ps.setString(2,  snippet.snippetText);
            ps.setString(3,  snippet.snippetInfo);
            ps.setObject(4,  Timestamp.from(snippet.timeStamp));
            ps.setString(5,  snippet.languageSelected);
            ps.setString(6,  snippet.viewerPassword);
            int passStatus = snippet.viewerPasswordEnabled ? 1 : 0;
            ps.setObject(7,  passStatus);
            ps.execute();
            return true;

        } catch (Exception e) {
            throw new Exception("Failed to create snippet: " + e.getMessage());
        }
    }

    public List<Snippet> getAllSnippets() throws Exception {
        
//        List<Constant> allConstants = new ArrayList<>();
//        try {
//            Statement statement = conn.createStatement();
//            String query = "SELECT * FROM " + tblName + ";";
//            ResultSet resultSet = statement.executeQuery(query);
//
//            while (resultSet.next()) {
//                Constant c = generateConstant(resultSet);
//                allConstants.add(c);
//            }
//            resultSet.close();
//            statement.close();
//            return allConstants;
//
//        } catch (Exception e) {
//            throw new Exception("Failed in getting books: " + e.getMessage());
//        }
    	return null;
    }
    
    private Snippet generateSnippet(ResultSet resultSet) throws Exception {
        String uuid  = resultSet.getString("snippetId");
//        String text = resultSet.getObject("snippetText", String.class);
//        String info = resultSet.getObject("snippetInfo", String.class);
        String text = resultSet.getString("snippetText");
        String info = resultSet.getString("snippetInfo");
        Instant datetime = resultSet.getTimestamp("timeStamp").toInstant();
        String language = resultSet.getString("languageSelected");
        String password = resultSet.getString("viewerPassword");
        int passStatus = resultSet.getInt("viewerPasswordStatus");


        return new Snippet (uuid, text, info, datetime, language, password, passStatus);
    }

}