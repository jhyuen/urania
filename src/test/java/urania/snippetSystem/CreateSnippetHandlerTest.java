package urania.snippetSystem;

import java.io.IOException;

import org.junit.Assert;
import org.junit.BeforeClass;
import org.junit.Test;

import com.amazonaws.services.lambda.runtime.Context;

import urania.snippetSystem.http.CreateSnippetResponse;
import urania.snippetSystem.model.Snippet;

/**
 * A simple test harness for locally invoking your Lambda function handler.
 */
public class CreateSnippetHandlerTest {

    private static Object input;

    @BeforeClass
    public static void createInput() throws IOException {
        // TODO: set up your sample input object here.
        input = null;
    }

    private Context createContext() {
        TestContext ctx = new TestContext();

        // TODO: customize your context here if needed.
        ctx.setFunctionName("Your Function Name");

        return ctx;
    }

    @Test
    public void testLambdaFunctionHandler() {
        CreateSnippetHandler handler = new CreateSnippetHandler();
        Context ctx = createContext();

        CreateSnippetResponse response = handler.handleRequest(null, ctx);

        // TODO: validate output here if needed.
        // This will fail
        Assert.assertEquals("Hello from Lambda!", response);
    }
}
