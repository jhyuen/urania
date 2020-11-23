package urania.snippetSystem.db;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import urania.snippetSystem.model.Snippet;
import java.time.temporal.ChronoUnit;

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
    
    public boolean updateSnippetText (String snippetID, String snippetText) throws Exception {
        try {
        	String query = "UPDATE " + tblName + " SET snippetText=? WHERE snippetId=?;";
        	PreparedStatement ps = conn.prepareStatement(query);
            ps.setString(1, snippetText);
            ps.setString(2, snippetID);
            int numAffected = ps.executeUpdate();
            ps.close();
            
            return (numAffected == 1);
        } catch (Exception e) {
            throw new Exception("Failed to update snippet text: " + e.getMessage());
        }
    }

    public boolean updateSnippetInfo (String snippetID, String snippetInfo) throws Exception {
        try {
        	String query = "UPDATE " + tblName + " SET snippetInfo=? WHERE snippetId=?;";
        	PreparedStatement ps = conn.prepareStatement(query);
            ps.setString(1, snippetInfo);
            ps.setString(2, snippetID);
            int numAffected = ps.executeUpdate();
            ps.close();
            
            return (numAffected == 1);
        } catch (Exception e) {
            throw new Exception("Failed to update snippet info: " + e.getMessage());
        }
    }

    public boolean enableSnippetPassword (String snippetID, Boolean enable) throws Exception {
        try {
        	String query = "UPDATE " + tblName + " SET viewerPasswordStatus=? WHERE snippetId=?;";
        	int passStatus = (enable) ? 1 : 0;
        	PreparedStatement ps = conn.prepareStatement(query);
            ps.setInt(1, passStatus);
            ps.setString(2, snippetID);
            int numAffected = ps.executeUpdate();
            ps.close();
            
            return (numAffected == 1);
        } catch (Exception e) {
            throw new Exception("Failed to update snippet password status: " + e.getMessage());
        }
    }
    
    public boolean deleteSnippet (String uuid) throws Exception {
        try {
            PreparedStatement ps = conn.prepareStatement("DELETE FROM " + tblName + " WHERE snippetId = ?;");
            ps.setString(1, uuid);
            int numAffected = ps.executeUpdate();
            ps.close();
            
            return (numAffected == 1);

        } catch (Exception e) {
            throw new Exception("Failed to delete snippet: " + e.getMessage());
        }
    }

    public List<String> deleteStaleSnippet (int daysOld) throws Exception {
    	try {		
    		List<String> deleteSnippetIds = new ArrayList<>();
    		
    		PreparedStatement snippetsToBeDeletedPs = conn.prepareStatement("SELECT snippetId FROM " + tblName + " WHERE timeStamp < ?;");
            
            Instant newTime = Instant.now().minus(daysOld, ChronoUnit.DAYS);
            Timestamp timestamp = Timestamp.from(newTime);
            
            snippetsToBeDeletedPs.setString(1, timestamp.toString());
            	
            ResultSet resultSet = snippetsToBeDeletedPs.executeQuery();
            
            while (resultSet.next()) {
            	String uuid  = resultSet.getString("snippetId");
            	deleteSnippetIds.add(uuid);
            }
            
            resultSet.close();
            snippetsToBeDeletedPs.close();
            
            PreparedStatement ps = conn.prepareStatement("DELETE FROM " + tblName + " WHERE timeStamp < ?;");
            ps.setString(1, timestamp.toString());
            
            int numAffected = ps.executeUpdate();
            ps.close();
            
            return deleteSnippetIds;

        } catch (Exception e) {
            throw new Exception("Failed to delete stale snippet: " + e.getMessage());
        }
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
        List<Snippet> allSnippets = new ArrayList<>();
        try {
            Statement statement = conn.createStatement();
            String query = "SELECT * FROM " + tblName + ";";
            ResultSet resultSet = statement.executeQuery(query);

            while (resultSet.next()) {
                Snippet s = generateSnippet(resultSet);
                allSnippets.add(s);
            }
            resultSet.close();
            statement.close();
            return allSnippets;

        } catch (Exception e) {
            throw new Exception("Failed in getting books: " + e.getMessage());
        }
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