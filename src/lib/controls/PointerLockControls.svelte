<script >import { createEventDispatcher, onMount, onDestroy } from 'svelte';
    import { Camera, Object3D, Vector3 } from 'three';
    import { PointerLockControls as ThreePointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';
    import { useFrame } from '../hooks/useFrame';
    import { useThrelte } from '../hooks/useThrelte';
    import { getParent } from '../internal/HierarchicalObject.svelte';
    import { getThrelteUserData } from '../lib/getThrelteUserData';
    export let isLocked = undefined;
    export let enableZoom = undefined;
    export let keyPanSpeed = undefined;
    export let keys = undefined;
    export let maxAzimuthAngle = undefined;
    export let maxDistance = undefined;
    export let maxPolarAngle = undefined;
    export let maxZoom = undefined;
    export let minAzimuthAngle = undefined;
    export let minDistance = undefined;
    export let minPolarAngle = undefined;
    export let minZoom = undefined;
    export let mouseButtons = undefined;
    export let panSpeed = undefined;
    export let rotateSpeed = undefined;
    export let screenSpacePanning = undefined;
    export let touches = undefined;
    export let zoomSpeed = undefined;
    const parent = getParent();
    const { renderer, scene, camera, invalidate } = useThrelte();
    if (!renderer)
        throw new Error('Threlte Context missing: Is <PointerLockControls> a child of <Canvas>?');
    if (!($parent instanceof Camera)) {
        throw new Error('Parent missing: <PointerLockControls> need to be a child of a <Camera>');
    }
    const dispatch = createEventDispatcher();
    const onChange = () => {
        invalidate('PointerLockControls: change event');
        dispatch('change');
    };
    const onStart = () => dispatch('start');
    const onEnd = () => dispatch('end');
    export const controls = new ThreePointerLockControls($parent, renderer.domElement);

    const velocity = new Vector3();
    const direction = new Vector3();

    let prevTime = performance.now();

    getThrelteUserData($parent).pointerLockControls = controls;
    controls.addEventListener('change', onChange);
    controls.addEventListener('start', onStart);
    controls.addEventListener('end', onEnd);
    onDestroy(() => {
        delete getThrelteUserData($parent).PointerLockControls;
        controls.removeEventListener('change', onChange);
        controls.removeEventListener('start', onStart);
        controls.removeEventListener('end', onEnd);
    });
    $: {
        if (isLocked !== undefined)
            controls.isLocked = isLocked;
        if (enableZoom !== undefined)
            controls.enableZoom = enableZoom;
        if (keyPanSpeed !== undefined)
            controls.keyPanSpeed = keyPanSpeed;
        if (keys !== undefined)
            controls.keys = keys;
        if (maxAzimuthAngle !== undefined)
            controls.maxAzimuthAngle = maxAzimuthAngle;
        if (maxDistance !== undefined)
            controls.maxDistance = maxDistance;
        if (maxPolarAngle !== undefined)
            controls.maxPolarAngle = maxPolarAngle;
        if (maxZoom !== undefined)
            controls.maxZoom = maxZoom;
        if (minAzimuthAngle !== undefined)
            controls.minAzimuthAngle = minAzimuthAngle;
        if (minDistance !== undefined)
            controls.minDistance = minDistance;
        if (minPolarAngle !== undefined)
            controls.minPolarAngle = minPolarAngle;
        if (minZoom !== undefined)
            controls.minZoom = minZoom;
        if (mouseButtons !== undefined)
            controls.mouseButtons = mouseButtons;
        if (panSpeed !== undefined)
            controls.panSpeed = panSpeed;
        if (rotateSpeed !== undefined)
            controls.rotateSpeed = rotateSpeed;
        if (screenSpacePanning !== undefined)
            controls.screenSpacePanning = screenSpacePanning;
        if (touches !== undefined)
            controls.touches = touches;
        if (zoomSpeed !== undefined)
            controls.zoomSpeed = zoomSpeed;

        invalidate('PointerLockControls: props changed');
    }

    let moveForward = false;
    let moveLeft = false;
    let moveBackward = false;
    let moveRight = false;

    const onKeyDown = function ( event ) {
        if(event.target.localName === "select") {
            return;
        }
        switch ( event.code ) {
        case 'ArrowUp':
        case 'KeyW':
            moveForward = true;
            break;

        case 'ArrowLeft':
        case 'KeyA':
            moveLeft = true;
            break;

        case 'ArrowDown':
        case 'KeyS':
            moveBackward = true;
            break;

        case 'ArrowRight':
        case 'KeyD':
            moveRight = true;
            break;
        }
    };

    const onKeyUp = function ( event ) {
        switch ( event.code ) {
        case 'ArrowUp':
        case 'KeyW':
            moveForward = false;
            break;

        case 'ArrowLeft':
        case 'KeyA':
            moveLeft = false;
            break;

        case 'ArrowDown':
        case 'KeyS':
            moveBackward = false;
            break;

        case 'ArrowRight':
        case 'KeyD':
            moveRight = false;
            break;
        }
    };


	onMount(() => {
        let frame;

        function loop() {
            frame = requestAnimationFrame(loop);
            const time = performance.now();

            if($camera) {
                const delta = ( time - prevTime ) / 1000;
            
                velocity.x -= velocity.x * delta;
                velocity.z -= velocity.z * delta;
            
                direction.z = Number( moveForward ) - Number( moveBackward );
                direction.x = Number( moveRight ) - Number( moveLeft );
                direction.normalize(); // this ensures consistent movements in all directions
            
                if ( moveForward || moveBackward ) {
                velocity.z -= direction.z * 600.0 * delta;
                }
                if ( moveLeft || moveRight ) {
                velocity.x -= direction.x * 600.0 * delta;
                }    
        
                controls.moveRight( - velocity.x * delta );
                controls.moveForward( - velocity.z * delta );

                controls.getObject().position.y += ( velocity.y * delta ); // new behavior

                if ( controls.getObject().position.y < 150 ) {
                velocity.y = 0;
                controls.getObject().position.y = 150;
                }
            }
            prevTime = time;
            if($camera) {
                renderer.render( scene, $camera );
            }
        }

		loop();

		return () => cancelAnimationFrame(frame);
    
	});

    function pointerLock(lock) {
        controls.isLocked = lock;
    }


    document.addEventListener( 'keydown', onKeyDown );
    document.addEventListener( 'keyup', onKeyUp );
    document.addEventListener( 'mousedown', () => pointerLock(true) );
    document.addEventListener( 'mouseup', () => pointerLock(false) );

    onDestroy(() => {
        controls.dispose();
        invalidate('PointerLockControls: onDestroy');
    });
    </script>
    
