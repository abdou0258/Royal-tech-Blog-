export async function Logout(navigate, setError) {
    try {
      const response = await fetch('/admin/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        navigate('/admin');
      } else {
        if (setError) {
          setError('Invalid email or password');
        }
      }
    } catch (error) {
      console.error('Error:', error);
      if (setError) {
        setError('An unexpected error occurred');
      }
    }
  }
  