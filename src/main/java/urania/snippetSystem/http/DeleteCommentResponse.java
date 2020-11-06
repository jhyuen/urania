package urania.snippetSystem.http;

public class DeleteCommentResponse {

  public final String   response;
  public final int      httpCode;

  public DeleteCommentResponse(String s, int code) {
    this.response     = s;
    this.httpCode     = code;
  }
  
  public DeleteCommentResponse(int code) {
    this.response     = "Failed to get comment.";
    this.httpCode     = code;
  }

  //200 means success
  public DeleteCommentResponse(String commentID) {
    this.response     = "Deleted comment with ID: " + commentID;
    this.httpCode     = 200;
  }
  
    public String toString() {
        return "DeleteComment(" + response + ")";
    }
}
