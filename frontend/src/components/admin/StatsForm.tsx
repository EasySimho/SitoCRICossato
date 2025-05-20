import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, TextField, Typography, Paper, Container } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';

interface Stat {
  _id?: string;
  title: string;
  value: string;
  description: string;
}

const StatsForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stat, setStat] = useState<Stat>({
    title: '',
    value: '',
    description: ''
  });

  useEffect(() => {
    if (id) {
      fetchStat();
    }
  }, [id]);

  const fetchStat = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/stats/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch stat');
      const data = await response.json();
      setStat(data);
    } catch (err) {
      setError('Error fetching stat');
      console.error(err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const url = id 
        ? `http://localhost:3000/api/stats/${id}`
        : 'http://localhost:3000/api/stats';
      
      const method = id ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(stat)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save stat');
      }

      navigate('/admin/stats');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setStat(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {id ? 'Edit Statistic' : 'New Statistic'}
        </Typography>

        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            id="title"
            label="Title"
            name="title"
            value={stat.title}
            onChange={handleChange}
            error={!stat.title}
            helperText={!stat.title ? 'Title is required' : ''}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="value"
            label="Value"
            name="value"
            value={stat.value}
            onChange={handleChange}
            error={!stat.value}
            helperText={!stat.value ? 'Value is required' : ''}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="description"
            label="Description"
            name="description"
            value={stat.description}
            onChange={handleChange}
            multiline
            rows={4}
            error={!stat.description}
            helperText={!stat.description ? 'Description is required' : ''}
          />

          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              fullWidth
            >
              {loading ? 'Saving...' : id ? 'Update' : 'Create'}
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate('/admin/stats')}
              fullWidth
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default StatsForm; 