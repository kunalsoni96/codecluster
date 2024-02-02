import React, {Suspense} from 'react';
import  {ColorRing}  from 'react-loader-spinner';
const LazyLoadedComponent = React.lazy(() => import('./Home'));

export default function App() {
  return(
      <Suspense fallback={
      <div style={{ display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'}}>
      <ColorRing
          type="TailSpin"
          color="#00BFFF"
          height={100}
          width={100}
      />
      </div>}>
        <LazyLoadedComponent />
      </Suspense>
  )
}