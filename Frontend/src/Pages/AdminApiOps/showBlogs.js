export async function ShowBlogs(setBlogs, navigate, setError) {
    try {
      const response = await fetch('/blogs/myblogs', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        setBlogs(data.blogs);
      } else {
        navigate('/admin');
      }
    } catch (error) {
      if (setError) {
        setError('Cannot retrieve blogs please try again later');
      }
    }
  }