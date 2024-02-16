export async function deleteBlog(blogId, setBlogs, setError) {
    try {
      const response = await fetch(`https://royal-tech-blog.onrender.com/blogs/myblogs/${blogId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        
        setBlogs(prevBlogs => prevBlogs.filter(blog => blog._id !== blogId));
      } 
    } catch (error) {
      console.error('Error:', error);
      
        setError('An unexpected error occurred');
      
    }
  }
  