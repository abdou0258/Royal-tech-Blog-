export async function check(action,navigate,setError) {
    try {
        const response = await fetch(`https://royal-tech-blog.onrender.com/admin/blogs/${action}blog`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          
        });
        
        if (response.status ===401) {
          navigate('/admin')
        }
      } catch (error) {
        setError('something went wrong')
      }
  }
  