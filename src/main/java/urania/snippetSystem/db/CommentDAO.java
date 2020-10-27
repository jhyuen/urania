package urania.snippetSystem.db;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import com.amazonaws.services.lambda.runtime.LambdaLogger;

import edu.wpi.cs.heineman.demo.model.Constant;

/**
 * Comment Data Access Object
 * 
 * Note that CAPITALIZATION matters regarding the table name. If you create with 
 * a capital "Constants" then it must be "Constants" in the SQL queries.
 * 
 * @author heineman
 *
 */
public class CommentDAO { 

	java.sql.Connection conn;
	
	final String tblName = "Comment";   // Exact capitalization

    public CommentDAO () {
    	try  {
    		conn = DatabaseUtil.connect();
    	} catch (Exception e) {
    		conn = null;
    	}
    }

    public Comment getComment(String name) throws Exception {
        
//        try {
//            Comment comment = null;
//            PreparedStatement ps = conn.prepareStatement("SELECT * FROM " + tblName + " WHERE name=?;");
//            ps.setString(1,  name);
//            ResultSet resultSet = ps.executeQuery();
//            
//            while (resultSet.next()) {
//                comment = generateComment(resultSet);
//            }
//            resultSet.close();
//            ps.close();
//            
//            return comment;
//
//        } catch (Exception e) {
//        	e.printStackTrace();
//            throw new Exception("Failed in getting comment: " + e.getMessage());
//        }
        return null;
    }
    
    public boolean updateComment(Comment comment) throws Exception {
//        try {
//        	String query = "UPDATE " + tblName + " SET value=? WHERE name=?;";
//        	PreparedStatement ps = conn.prepareStatement(query);
//            ps.setDouble(1, comment.value);
//            ps.setString(2, comment.name);
//            int numAffected = ps.executeUpdate();
//            ps.close();
//            
//            return (numAffected == 1);
//        } catch (Exception e) {
//            throw new Exception("Failed to update report: " + e.getMessage());
//        }
    }
    
    public boolean deleteComment(Comment comment) throws Exception {
//        try {
//            PreparedStatement ps = conn.prepareStatement("DELETE FROM " + tblName + " WHERE name = ?;");
//            ps.setString(1, comment.name);
//            int numAffected = ps.executeUpdate();
//            ps.close();
//            
//            return (numAffected == 1);
//
//        } catch (Exception e) {
//            throw new Exception("Failed to insert comment: " + e.getMessage());
//        }
    	return false;
    }


    public boolean addComment(Comment comment) throws Exception {
//        try {
//            PreparedStatement ps = conn.prepareStatement("SELECT * FROM " + tblName + " WHERE name = ?;");
//            ps.setString(1, comment.name);
//            ResultSet resultSet = ps.executeQuery();
//            
//            // already present?
//            while (resultSet.next()) {
//                Comment c = generateComment(resultSet);
//                resultSet.close();
//                return false;
//            }
//
//            ps = conn.prepareStatement("INSERT INTO " + tblName + " (name,value) values(?,?);");
//            ps.setString(1,  comment.name);
//            ps.setDouble(2,  comment.value);
//            ps.execute();
//            return true;
//
//        } catch (Exception e) {
//            throw new Exception("Failed to insert comment: " + e.getMessage());
//        }
    	return false;
    }

    public List<Comment> getAllComments() throws Exception {
        
//        List<Comment> allComments = new ArrayList<>();
//        try {
//            Statement statement = conn.createStatement();
//            String query = "SELECT * FROM " + tblName + ";";
//            ResultSet resultSet = statement.executeQuery(query);
//
//            while (resultSet.next()) {
//                Comment c = generateComment(resultSet);
//                allComments.add(c);
//            }
//            resultSet.close();
//            statement.close();
//            return allComments;
//
//        } catch (Exception e) {
//            throw new Exception("Failed in getting books: " + e.getMessage());
//        }
    	return null;
    }
    
//    private Comment generateComment(ResultSet resultSet) throws Exception {
//        String name  = resultSet.getString("name");
//        Double value = resultSet.getDouble("value");
//        return new Comment (name, value);
//    }

}