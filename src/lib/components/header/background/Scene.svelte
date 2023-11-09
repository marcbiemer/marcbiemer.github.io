<script lang="ts">
  import { T } from '@threlte/core'
  import fragmentShader from '../../../../shaders/fragment';
  import vertexShader from '../../../../shaders/vertex';
  import { ContactShadows, Float, Grid, OrbitControls, RoundedBoxGeometry } from '@threlte/extras'
  import { Clock } from 'three';

  let elapTime = 0;
  let rot = 0;
  const clock = new Clock();

  let animate = () => {
    const elapsedTime = clock.getElapsedTime();
    elapTime = elapsedTime;
    rot = Math.sin(elapsedTime) / 4 + elapsedTime / 20 - 5;
    requestAnimationFrame(animate);
  };
  animate();
</script>

<T.PerspectiveCamera
  makeDefault
  position={[0, 0.2, 10]}
  fov={15}
>
  <!-- <OrbitControls
    enableZoom={false}
    enableDamping
    target.y={0}
  /> -->
</T.PerspectiveCamera>

<!-- <T.DirectionalLight
  intensity={0.5}
  position.x={-8}
  position.y={10}
/> -->
<T.AmbientLight intensity={0.5} />

<!-- <Grid
  position.y={0}
  cellColor="#ffffff"
  sectionColor="#ffffff"
  sectionThickness={0}
  fadeDistance={25}
  cellSize={1}
/> -->

<T.Mesh
  position = {[0, .2, 0]}
  rotation.z = {rot}

>
  <T.TorusGeometry args={[1, 0.3, 1000, 1000]}/>
  <T.ShaderMaterial
    {fragmentShader}
    {vertexShader}
    uniforms={{
      uTime: {
        value: 0
      },
      uResolution: {
        value: 0
      },
      uDisplace: {
        value: .8
      },
      uSpread: {
        value: 1.9
      },
      uNoise: {
        value: 16
      },
    }}
    uniforms.uTime.value = {elapTime}
  />
</T.Mesh>

<!-- <ContactShadows
  scale={10}
  blur={2}
  far={2.5}
  opacity={0.5}
/> -->

<!-- <Float
  floatIntensity={0}
  floatingRange={[0, 1]}
>
  <T.Mesh
    position.x={-.5}
    position.y={1.5}
    position.z={0}
  > -->
    <!-- <T.ExtrudeGeometry /> -->
    <!-- <RoundedBoxGeometry args={[5, .25, 5]} radius={.07} />
    <T.MeshStandardMaterial color="#00F9F9" />
  </T.Mesh>
  <T.Mesh
    position.x={-.5}
    position.y={1.65}
    position.z={0}
  > -->
    <!-- <T.ExtrudeGeometry /> -->
    <!-- <RoundedBoxGeometry args={[4, .25, 4]} radius={.07} />
    <T.MeshStandardMaterial color="#00F9F9" />
  </T.Mesh>
</Float> -->

<!-- <Float
  floatIntensity={1}
  floatingRange={[0, 1]}
>
  <T.Mesh
    position={[1.2, 1.5, 0.75]}
    rotation.x={5}
    rotation.y={71}
  >
    <T.TorusKnotGeometry args={[0.5, 0.15, 100, 12, 2, 3]} />
    <T.MeshStandardMaterial color="#F85122" />
  </T.Mesh>
</Float> -->

<!-- <Float
  floatIntensity={1}
  floatingRange={[0, 1]}
>
  <T.Mesh
    position={[-1.4, 1.5, 0.75]}
    rotation={[-5, 128, 10]}
  >
    <T.IcosahedronGeometry />
    <T.MeshStandardMaterial color="#F8EBCE" />
  </T.Mesh>
</Float> -->
