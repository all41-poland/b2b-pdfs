import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import styles from './InteractiveBackground.module.css';

const InteractiveBackground = () => {

  const ref = useRef(null);

  const generateInteractiveBackground = () => {
    let camera
    let scene
    let renderer
    let material
    let mouseX = 0
    let mouseY = 0
    let windowHalfX = window.innerWidth / 2
    let windowHalfY = window.innerHeight / 2

    const WIDTH = window.innerWidth;
    const HEIGHT = window.innerHeight;

    const init = () =>  {
      camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 5, 2000)
      camera.position.z = 500

      scene = new THREE.Scene()
      scene.fog = new THREE.FogExp2(0x0000ff, 0.001)

      const geometry = new THREE.BufferGeometry()
      const vertices = []
      const size = 2000

      for (let i = 0; i < 20000; i++) {
        const x = (Math.random() * size + Math.random() * size) / 2 - size / 2
        const y = (Math.random() * size + Math.random() * size) / 2 - size / 2
        const z = (Math.random() * size + Math.random() * size) / 2 - size / 2

        vertices.push(x, y, z)
      }

      geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))

      material = new THREE.PointsMaterial({
        size: 2,
        color: 0xffffff,
      })

      const particles = new THREE.Points(geometry, material)
      scene.add(particles)

      renderer = new THREE.WebGLRenderer()
      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.setSize(WIDTH, HEIGHT)

      const resultComponent = renderer.domElement;
      return resultComponent;
    }

    function onWindowResize() {
      windowHalfX = window.innerWidth / 2
      windowHalfY = window.innerHeight / 2

      camera.aspect = WIDTH / HEIGHT;
      camera.updateProjectionMatrix()
      renderer.setSize(WIDTH, HEIGHT)
    }

    function onPointerMove(event) {
      mouseX = event.clientX - windowHalfX
      mouseY = event.clientY - windowHalfY
    }

    function render() {
      camera.position.x += (mouseX * 2 - camera.position.x) * 0.02
      camera.position.y += (-mouseY * 2 - camera.position.y) * 0.02
      camera.lookAt(scene.position)
      renderer.render(scene, camera)
      scene.rotation.x += 0.001
      scene.rotation.y += 0.002
    }

    function animate() {
      requestAnimationFrame(animate)
      render()
    }

    const resultComponent = init();
    ref.current.appendChild(resultComponent);
    ref.current.style.touchAction = 'none'
    ref.current.addEventListener('pointermove', onPointerMove)
    window.addEventListener('resize', onWindowResize)
    animate();
  }

  useEffect(() => {
    generateInteractiveBackground();
  }, []);

  return (
    <div ref={ref} className={styles.wrapper}>
    </div>
  )
}

export default InteractiveBackground