---
title: Instance
---

!!!module_summary title=Instance|sourcePath=objects/Instance.svelte|name=Instance|from=threlte|type=component
Every `<Instance>` component nested in an [`<InstancedMesh>`](/docs/components/12-instanced-mesh) component resembles one instance. An `<Instance>` can therefore only be used as a child component to a `<InstancedMesh>` component. The `<Instance>` component can be transformed and colorized individually:

```svelte
<InstancedMesh {geometry} {material}>
  <Instance position={{ x: 5 }} scale={1} />
  <Instance position={{ z: 2 }} scale={2} color="red" />
</InstancedMesh>
```

!!!

### Examples

The properties `position`, `rotation` and `scale` work just like with every other threlte component, `color` is passed on to the [THREE.Color](https://threejs.org/docs/#api/en/math/Color) constructor.

Provide an `id` to use multiple `<InstancedMesh>` components:

```svelte
<InstancedMesh id="tree" geometry={treeGeometry} material={treeMaterial}>
  <InstancedMesh id="leaf" geometry={leafGeometry} material={leafMaterial}>
    <Group position={{ x: 1 }}>
      <Instance id="tree" /> // Instance of InstancedMesh with id="tree"
      <Instance id="leaf" /> // Instance of InstancedMesh with id="leaf"
    </Group>

    <Group position={{ x: -2 }}>
      <Instance id="tree" />
      <Instance id="leaf" />
    </Group>
  </InstancedMesh>
</InstancedMesh>
```