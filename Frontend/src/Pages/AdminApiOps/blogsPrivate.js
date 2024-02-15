export async function check(navigate) {
    try {
      const response = await fetch('/admin/blogs', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 401) {
        navigate('/admin');
      }
    } catch (error) {
      console.error('unauthorized', error)
    }
  }
  