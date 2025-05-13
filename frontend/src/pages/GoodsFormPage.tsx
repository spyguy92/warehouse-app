import GoodsForm from '../components/GoodsForm';

const GoodsFormPage = () => {
  return (
    <div>
      <h1>{window.location.pathname.includes('edit') ? 'Edit Goods' : 'Create Goods'}</h1>
      <GoodsForm />
    </div>
  );
};

export default GoodsFormPage;