export async function addBlog(navigate, setError,title, category, type, paragraph,image) {
    try {
        const response = await fetch("/blogs/myblogs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, category, type, paragraph,image }),
        });
        
        if (response.status === 201) {
          navigate("/admin/blogs");
        } 
      } catch (error) {
        console.error("Error:", error);
        setError("an error occured cannot add Blog, please try again later");
      }
    
}