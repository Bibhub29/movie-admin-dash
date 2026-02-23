import { useEffect, useMemo, useState } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Modal from '../../components/ui/Modal';
import Spinner from '../../components/ui/Spinner';
import { useToast } from '../../context/ToastContext';
import {
  createAdminMovie,
  deleteAdminMovie,
  getAdminMovies,
  updateAdminMovie
} from './adminService';

const initialForm = {
  title: '',
  description: '',
  price: '',
  rating: '',
  actors: '',
  cover: null,
  video: null
};

function buildFormData(form) {
  const formData = new FormData();
  formData.append('title', form.title);
  formData.append('description', form.description);
  formData.append('price', form.price);
  if (form.rating) formData.append('rating', form.rating);
  if (form.actors) formData.append('actors', form.actors);
  if (form.cover) formData.append('cover', form.cover);
  if (form.video) formData.append('video', form.video);
  return formData;
}

export default function AdminMovies() {
  const { showToast } = useToast();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingMovie, setEditingMovie] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [saving, setSaving] = useState(false);

  const loadMovies = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getAdminMovies();
      const list = Array.isArray(data) ? data : data?.movies || [];
      setMovies(list);
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to fetch movies');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMovies();
  }, []);

  const openCreate = () => {
    setEditingMovie(null);
    setForm(initialForm);
    setModalOpen(true);
  };

  const openEdit = (movie) => {
    setEditingMovie(movie);
    setForm({
      title: movie.title || '',
      description: movie.description || '',
      price: movie.price || '',
      rating: movie.rating || '',
      actors: Array.isArray(movie.actors) ? movie.actors.join(', ') : movie.actors || '',
      cover: null,
      video: null
    });
    setModalOpen(true);
  };

  const canSubmit = useMemo(() => form.title && form.description && form.price, [form]);

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!canSubmit) return;

    setSaving(true);
    try {
      const formData = buildFormData(form);
      if (editingMovie) {
        await updateAdminMovie(editingMovie.id || editingMovie._id, formData);
        showToast({ type: 'success', title: 'Movie updated' });
      } else {
        await createAdminMovie(formData);
        showToast({ type: 'success', title: 'Movie created' });
      }

      setModalOpen(false);
      setForm(initialForm);
      await loadMovies();
    } catch (err) {
      showToast({ type: 'error', title: 'Save failed', message: err?.response?.data?.message || 'Unable to save movie' });
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async (movieId) => {
    try {
      await deleteAdminMovie(movieId);
      showToast({ type: 'success', title: 'Movie deleted' });
      await loadMovies();
    } catch (err) {
      showToast({ type: 'error', title: 'Delete failed', message: err?.response?.data?.message || 'Unable to delete movie' });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-white">Movies CRUD</h1>
        <Button onClick={openCreate}>Add Movie</Button>
      </div>

      {loading ? <Spinner /> : null}
      {!loading && error ? <p className="text-rose-300">{error}</p> : null}

      {!loading && !error ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {movies.map((movie) => (
            <Card key={movie.id || movie._id} className="space-y-3">
              <img src={movie.coverImageUrl} alt={movie.title} className="h-44 w-full rounded-xl object-cover" />
              <h3 className="text-lg font-semibold text-white">{movie.title}</h3>
              <p className="text-sm text-slate-300">Rs. {movie.price}</p>
              <div className="flex gap-2">
                <Button variant="secondary" onClick={() => openEdit(movie)}>Edit</Button>
                <Button variant="danger" onClick={() => onDelete(movie.id || movie._id)}>Delete</Button>
              </div>
            </Card>
          ))}
        </div>
      ) : null}

      {modalOpen ? (
        <Modal title={editingMovie ? 'Edit Movie' : 'Add Movie'} onClose={() => setModalOpen(false)}>
          <form className="space-y-3" onSubmit={onSubmit}>
            <Input label="Title" value={form.title} onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))} required />
            <Input label="Description" value={form.description} onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))} required />
            <Input label="Price" type="number" value={form.price} onChange={(event) => setForm((prev) => ({ ...prev, price: event.target.value }))} required />
            <Input label="Rating" type="number" value={form.rating} onChange={(event) => setForm((prev) => ({ ...prev, rating: event.target.value }))} />
            <Input label="Actors (comma separated)" value={form.actors} onChange={(event) => setForm((prev) => ({ ...prev, actors: event.target.value }))} />

            <label className="block text-sm text-slate-200">
              Cover image
              <input className="mt-1 block w-full text-sm" type="file" accept="image/*" onChange={(event) => setForm((prev) => ({ ...prev, cover: event.target.files?.[0] || null }))} />
            </label>
            <label className="block text-sm text-slate-200">
              Video
              <input className="mt-1 block w-full text-sm" type="file" accept="video/*" onChange={(event) => setForm((prev) => ({ ...prev, video: event.target.files?.[0] || null }))} />
            </label>

            <Button type="submit" disabled={!canSubmit || saving}>{saving ? 'Saving...' : 'Save Movie'}</Button>
          </form>
        </Modal>
      ) : null}
    </div>
  );
}
