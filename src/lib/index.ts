// canvas component
export { default as Canvas } from './Canvas.svelte'

// camera components
export { default as OrthographicCamera } from './cameras/OrthographicCamera.svelte'
export { default as PerspectiveCamera } from './cameras/PerspectiveCamera.svelte'

// audio components
export { default as AudioListener } from './audio/AudioListener.svelte'
export { default as Audio } from './audio/Audio.svelte'
export { default as PositionalAudio } from './audio/PositionalAudio.svelte'

// helper components
export { default as PositionalAudioHelper } from './helpers/PositionalAudioHelper.svelte'

// control component
export { default as OrbitControls } from './controls/OrbitControls.svelte'
export { default as TransformControls } from './controls/TransformControls.svelte'
export { default as PointerLockControls } from './controls/PointerLockControls.svelte';

// effect components
export { default as Pass } from './effects/Pass.svelte'

// light components
export { default as AmbientLight } from './lights/AmbientLight.svelte'
export { default as DirectionalLight } from './lights/DirectionalLight.svelte'
export { default as PointLight } from './lights/PointLight.svelte'
export { default as HemisphereLight } from './lights/HemisphereLight.svelte'
export { default as SpotLight } from './lights/SpotLight.svelte'

// misc components
export { default as Fog } from './misc/Fog.svelte'
export { default as FogExp2 } from './misc/FogExp2.svelte'
export { default as Layers } from './misc/Layers.svelte'
export { default as ContextBridge } from './misc/ContextBridge.svelte'

// object components
export { default as Mesh } from './objects/Mesh.svelte'
export { default as InstancedMesh } from './objects/InstancedMesh.svelte'
export { default as Instance } from './objects/Instance.svelte'
export { default as Group } from './objects/Group.svelte'
export { default as Object3D } from './objects/Object3D.svelte'
export { default as GLTF } from './objects/GLTF.svelte'
export { default as Line } from './objects/Line.svelte'
export { default as Line2 } from './objects/Line2.svelte'
export { default as LineSegments } from './objects/LineSegments.svelte'

// text component
export { default as Text } from './text/Text.svelte'

// object instance components
export { default as MeshInstance } from './instances/MeshInstance.svelte'
export { default as Object3DInstance } from './instances/Object3DInstance.svelte'
export { default as LightInstance } from './instances/LightInstance.svelte'
export { default as CameraInstance } from './instances/CameraInstance.svelte'
export { default as LineInstance } from './instances/LineInstance.svelte'

// hooks
export { useFrame } from './hooks/useFrame'
export { useThrelte } from './hooks/useThrelte'
export { useThrelteRoot } from './hooks/useThrelteRoot'
export { useThrelteAudio } from './hooks/useThrelteAudio'
export { useLoader } from './hooks/useLoader'
export { useTexture } from './hooks/useTexture'
export { useAudioListener } from './hooks/useAudioListener'

// types
export type {
  Position,
  Scale,
  Rotation,
  LookAt,
  ThrelteUseFrameOptions,
  ThrelteContext,
  ThrelteRootContext,
  ThrelteLayers,
  ThrelteUseLoader,
  ThreltePointerEvent,
  ThrelteInstance,
  Size
} from './types/types'

export type {
  HierarchicalObjectProperties,
  InteractiveObjectProperties,
  LayerableObjectProperties,
  TransformableObjectProperties,
  ViewportAwareObjectProperties,
  Object3DInstanceProperties,
  MeshInstanceProperties,
  InstancedMeshProperties,
  InstanceProperties,
  LightInstanceProperties,
  CameraInstanceProperties,
  OrthographicCameraProperties,
  PerspectiveCameraProperties,
  OrbitControlsProperties,
  PointerLockControls
  PassProperties,
  AmbientLightProperties,
  DirectionalLightProperties,
  HemisphereLightProperties,
  PointLightProperties,
  SpotLightProperties,
  FogProperties,
  FogExp2Properties,
  LayersProperties,
  GLTFProperties,
  GroupProperties,
  MeshProperties,
  Object3DProperties,
  TextProperties
} from './types/components'
