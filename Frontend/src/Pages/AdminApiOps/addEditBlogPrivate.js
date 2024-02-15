export async function check(action,navigate) {
    try {
        const response = await fetch(`/admin/blogs/${action}blog`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          
        });
        
        if (response.status ===401) {
          navigate('/admin')
        }
      
      } catch (error) {
        console.error('unauthorized', error);
      }
  }
  