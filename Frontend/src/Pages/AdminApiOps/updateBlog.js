export async function updateBlog(id,navigate, setError,title, category, type, paragraph,image) {

        try {
          
          const response = await fetch(`https://royal-tech-blog.onrender.com/blogs/myblogs/${id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ title, category, type, paragraph,image }),
          });
          
          if (response.status === 200) {
            navigate("/admin/blogs");
          } else {
            setError('an error occured cannot update Blog, please try again later')
          }
        } catch (error) {
          console.error("Error:", error);
          setError("An unexpected error occurred");
        }
      }
  