import { useSearchParams } from 'react-router-dom';

export default function useUrlPosition() {
const [searchParams] = useSearchParams();
  const lat = searchParams.get('lat')
  const lng = searchParams.get('lng') 
  console.log('hook',lat);
  return [lat, lng]
}
