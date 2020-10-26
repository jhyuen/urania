package snippetSystem.http;

public class CreateSnippetRequest {
	public String name;
	public double value;
	public boolean system;
	
	public String getName( ) { return name; }
	public void setName(String name) { this.name = name; }
	
	public boolean getSystem() { return system; }
	public void setSystem(boolean system) { this.system = system; }
	
	public double getValue() { return value; }
	public void setValue(double d) { this.value = d; }
	
	public CreateSnippetRequest (String n, double val) {
		this.name = n;
		this.value = val;
	}
	
	public CreateSnippetRequest (String n, double val, boolean system) {
		this.name = n;
		this.value = val;
		this.system = system;
	}
	
	public String toString() {
		return "CreateSnippet(" + name + "," + value + ")";
	}
}
