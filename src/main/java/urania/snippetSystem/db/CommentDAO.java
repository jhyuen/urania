package urania.snippetSystem.db;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import urania.snippetSystem.model.Comment;

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
	
	final String tblName = "UraniaSchema.Comment";   // Exact capitalization

    public CommentDAO () {
    	try  {
    		conn = DatabaseUtil.connect();
    	} catch (Exception e) {
    		conn = null;
    	}
    }

    public Comment getComment(String commentId) throws Exception {
        
        try {
            Comment comment = null;
            PreparedStatement ps = conn.prepareStatement("SELECT * FROM " + tblName + " WHERE commentId=?;");
            ps.setString(1,  commentId);
            ResultSet resultSet = ps.executeQuery();
            
            while (resultSet.next()) {
                comment = generateComment(resultSet);
            }
            resultSet.close();
            ps.close();
            
            return comment;

        } catch (Exception e) {
        	e.printStackTrace();
            throw new Exception("Failed in getting comment: " + e.getMessage());
        }
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
    	return false;
    }
    
    public boolean deleteCommentCommentID(String commentID) throws Exception {
        try {
            PreparedStatement ps = conn.prepareStatement("DELETE FROM " + tblName + " WHERE commentId = ?;");
            ps.setString(1, commentID);
            int numAffected = ps.executeUpdate();
            ps.close();
            return (numAffected == 1);
        } catch (Exception e) {
            throw new Exception("Failed to delete comment: " + e.getMessage());
        }
    	//return false;
    }

    public boolean deleteCommentSnippetID(String snippetID) throws Exception {
        try {
            PreparedStatement ps = conn.prepareStatement("DELETE FROM " + tblName + " WHERE snippetId = ?;");
            ps.setString(1, snippetID);
            int numAffected = ps.executeUpdate();
            ps.close();
            return (numAffected >= 1);
        } catch (Exception e) {
            throw new Exception("Failed to delete comment: " + e.getMessage());
        }
    	//return false;
    }


    public boolean createComment(Comment comment) throws Exception {
        try {
            PreparedStatement ps = conn.prepareStatement("SELECT * FROM " + tblName + " WHERE commentId = ?;");
            ps.setString(1, comment.commentID);
            ResultSet resultSet = ps.executeQuery();
            
            // already present?
            while (resultSet.next()) {
                Comment c = generateComment(resultSet);
                resultSet.close();
                return false;
            }

            ps = conn.prepareStatement("INSERT INTO " + tblName + " (snippetId,commentId,timeStamp,commentText,startLine,startChar,endLine,endChar) values(?,?,?,?,?,?,?,?);");
            
            ps.setString(1,  comment.snippetID);
            ps.setString(2,  comment.commentID);
            ps.setObject(3,  Timestamp.from(comment.timeStamp));
            ps.setString(4, comment.commentText);
            ps.setInt(5, comment.startLine);
            ps.setInt(6, comment.startIndex);
            ps.setInt(7, comment.endLine);
            ps.setInt(8, comment.endIndex);
            ps.execute();
            return true;

        } catch (Exception e) {
            throw new Exception("Failed to insert comment: " + e.getMessage());
        }
    }

    public List<Comment> getAllComments(String snippetID) throws Exception {
        List<Comment> allComments = new ArrayList<>();
        try {
            PreparedStatement ps = conn.prepareStatement("SELECT * FROM " + tblName + " WHERE snippetId = ?;");
            ps.setString(1, snippetID);
            ResultSet resultSet = ps.executeQuery();

            while (resultSet.next()) {
                Comment c = generateComment(resultSet);
                allComments.add(c);
            }
            resultSet.close();
            ps.close();
            return allComments;

        } catch (Exception e) {
            throw new Exception("Failed in getting comments: " + e.getMessage());
        }
    }
    
    public boolean deleteStaleSnippetComments (List<String> snippetIds) throws Exception {
    	try {		
            PreparedStatement ps = conn.prepareStatement("DELETE FROM " + tblName + " WHERE snippetId IN ?;");
            
            String snippetIdString = "(";
            for(int i=0;i<snippetIds.size();i++) {
            	if (i==snippetIds.size()-1) {
            		snippetIdString = snippetIdString + " '" + snippetIds.get(i) + "' ";
            	} else {
            		snippetIdString = snippetIdString + " '" + snippetIds.get(i) + "' ,";
            	}
            }
            
            snippetIdString = snippetIdString + ")";
            
            ps.setString(1, snippetIdString);
            ps.executeUpdate();
            ps.close();
            
            return true;

        } catch (Exception e) {
            throw new Exception("Failed to delete snippet: " + e.getMessage());
        }
    }
    
    private Comment generateComment(ResultSet resultSet) throws Exception {
      
      String snippetID    = resultSet.getString("snippetId");
      String commentID    = resultSet.getString("commentId");
      Instant timeStamp   = resultSet.getTimestamp("timeStamp").toInstant();;
      String commentText  = resultSet.getString("commentText");
      int startLine       = resultSet.getInt("startLine");
      int startIndex      = resultSet.getInt("startChar");
      int endLine         = resultSet.getInt("endLine");
      int endIndex        = resultSet.getInt("endChar");
      return new Comment (snippetID, commentID, timeStamp, commentText, startLine, startIndex, endLine, endIndex);
  }
}
