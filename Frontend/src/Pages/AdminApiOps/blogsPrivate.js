export async function check(navigate,setError) {
    try {
      const response = await fetch('https://royal-tech-blog.onrender.com/admin/blogs', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 401) {
        navigate('/admin');
      }
    } catch (error) {
      setError('something went wrong')
    }
  }
  