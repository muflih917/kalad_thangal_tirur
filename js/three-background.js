// Three.js Background - 3D Particle Field
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('three-canvas');
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create star/particle field
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1500;
    const posArray = new Float32Array(particlesCount * 3);
    const colorsArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i += 3) {
        posArray[i] = (Math.random() - 0.5) * 20;
        posArray[i + 1] = (Math.random() - 0.5) * 20;
        posArray[i + 2] = (Math.random() - 0.5) * 20;

        // Color: mix of gold and white
        const color = new THREE.Color();
        if (Math.random() > 0.6) {
            color.set('#c9a24b');
        } else {
            color.set('#ffffff');
        }
        colorsArray[i] = color.r;
        colorsArray[i + 1] = color.g;
        colorsArray[i + 2] = color.b;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.02,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Add a few larger glowing spheres
    const sphereGeometry = new THREE.SphereGeometry(0.08, 16, 16);
    const sphereMaterial = new THREE.MeshBasicMaterial({ color: '#e2c275', transparent: true, opacity: 0.6 });
    const spheres = [];
    for (let i = 0; i < 20; i++) {
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        sphere.position.set(
            (Math.random() - 0.5) * 15,
            (Math.random() - 0.5) * 15,
            (Math.random() - 0.5) * 15
        );
        spheres.push(sphere);
        scene.add(sphere);
    }

    camera.position.z = 5;

    // Resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);

        particlesMesh.rotation.y += 0.0005;
        particlesMesh.rotation.x += 0.0002;

        camera.lookAt(0, 0, 0);

        // Animate spheres
        spheres.forEach((sphere, index) => {
            sphere.rotation.x += 0.01;
            sphere.rotation.y += 0.01;
            sphere.position.y += Math.sin(Date.now() * 0.001 + index) * 0.001;
        });

        renderer.render(scene, camera);
    }

    animate();
});