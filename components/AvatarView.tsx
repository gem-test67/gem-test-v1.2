import React from 'react';
import { useEffect, useRef, useMemo } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { VRMLoaderPlugin, VRMExpressionPresetName, VRM, VRMHumanBoneName } from '@pixiv/three-vrm';

interface AvatarViewProps {
  currentEmotion: string;
  analyserNode: AnalyserNode | null;
}

// Type definitions for our pose structure
type BonePose = {
    rotation?: THREE.Euler;
    position?: THREE.Vector3;
};
type Pose = { [key in VRMHumanBoneName]?: BonePose };
type Poses = { [emotion:string]: Pose };

const AvatarView: React.FC<AvatarViewProps> = ({ currentEmotion, analyserNode }) => {
    const mountRef = useRef<HTMLDivElement>(null);
    const vrmRef = useRef<VRM | null>(null);
    const clockRef = useRef(new THREE.Clock());

    // Animation state
    const isBlinking = useRef(false);
    const blinkStartTime = useRef(0);
    const nextBlinkTime = useRef(3 + Math.random() * 4);
    const targetPoseRef = useRef<string>('NEUTRAL');
    const initialBoneTransforms = useRef<{ [key in VRMHumanBoneName]?: { position: THREE.Vector3, quaternion: THREE.Quaternion } }>({});
    const audioDataArray = useRef<Uint8Array | null>(null);
    const smoothedVolume = useRef(0);


    // Expression state
    const targetExpressionsRef = useRef<{ [name in VRMExpressionPresetName]?: number }>({
        [VRMExpressionPresetName.Happy]: 0.15 // Start with a slight smile
    });

    const poses: Poses = useMemo(() => ({
        NEUTRAL: {
            // Shoulders drooped slightly for a relaxed pose
            [VRMHumanBoneName.LeftShoulder]: { rotation: new THREE.Euler(0, 0, 0.1) },
            [VRMHumanBoneName.RightShoulder]: { rotation: new THREE.Euler(0, 0, -0.1) },
            
            // Arms resting naturally at the sides
            [VRMHumanBoneName.RightUpperArm]: { rotation: new THREE.Euler(0, 0, -0.15) },
            [VRMHumanBoneName.LeftUpperArm]: { rotation: new THREE.Euler(0, 0, 0.15) },
        },
        HAPPY: {
            [VRMHumanBoneName.RightUpperArm]: { rotation: new THREE.Euler(0, 0, 0.3) },
            [VRMHumanBoneName.LeftUpperArm]: { rotation: new THREE.Euler(0, 0, -0.3) },
        },
        SAD: {
            [VRMHumanBoneName.Head]: { rotation: new THREE.Euler(0.2, 0, 0) }, // Head tilted down
            [VRMHumanBoneName.Spine]: { rotation: new THREE.Euler(-0.1, 0, 0) }, // Slumped forward
            [VRMHumanBoneName.LeftShoulder]: { rotation: new THREE.Euler(0.1, 0, 0.2) }, // Shoulders slumped and forward
            [VRMHumanBoneName.RightShoulder]: { rotation: new THREE.Euler(0.1, 0, -0.2) },
        },
        SURPRISED: {
            [VRMHumanBoneName.LeftShoulder]: { rotation: new THREE.Euler(-0.2, 0, 0.2) }, // Shoulders raised
            [VRMHumanBoneName.RightShoulder]: { rotation: new THREE.Euler(-0.2, 0, -0.2) },
            [VRMHumanBoneName.RightUpperArm]: { rotation: new THREE.Euler(-0.5, 0, 0.9) }, // Arms slightly up and back
            [VRMHumanBoneName.LeftUpperArm]: { rotation: new THREE.Euler(-0.5, 0, -0.9) },
        },
        THINKING: {
            [VRMHumanBoneName.Head]: { rotation: new THREE.Euler(0, -0.2, -0.1) }, // Head tilt
            [VRMHumanBoneName.RightUpperArm]: { rotation: new THREE.Euler(0, 0, 0.5) }, // One arm slightly raised
            [VRMHumanBoneName.RightLowerArm]: { rotation: new THREE.Euler(1.5, -0.5, 0) },
            [VRMHumanBoneName.RightHand]: { rotation: new THREE.Euler(0, 0, -0.5) }, // Hand to chin-ish
        },
    }), []);

  // Handle expression changes
  useEffect(() => {
    // Define the target expression state based on emotion
    const newTarget: { [name in VRMExpressionPresetName]?: number } = {
        [VRMExpressionPresetName.Happy]: 0,
        [VRMExpressionPresetName.Sad]: 0,
        [VRMExpressionPresetName.Surprised]: 0,
    };

    switch (currentEmotion) {
        case 'HAPPY':
            newTarget[VRMExpressionPresetName.Happy] = 1.0;
            break;
        case 'SAD':
            newTarget[VRMExpressionPresetName.Sad] = 1.0;
            break;
        case 'SURPRISED':
            newTarget[VRMExpressionPresetName.Surprised] = 1.0;
            break;
        default: // NEUTRAL, THINKING, etc.
            newTarget[VRMExpressionPresetName.Happy] = 0.15; // Default slight smile
            break;
    }
    
    targetPoseRef.current = poses[currentEmotion] ? currentEmotion : 'NEUTRAL';
    targetExpressionsRef.current = newTarget;
  }, [currentEmotion, poses]);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, currentMount.clientWidth / currentMount.clientHeight, 0.1, 20.0);
    camera.position.set(0.0, 1.3, 2.5);
    camera.lookAt(0, 1.0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    currentMount.appendChild(renderer.domElement);

    // Add a floor
    const floorGeometry = new THREE.PlaneGeometry(10, 10);
    const floorMaterial = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.8 });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = 0;
    scene.add(floor);
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(2, 2, 3).normalize();
    scene.add(directionalLight);
    const pointLight = new THREE.PointLight(0xab88ff, 5, 10);
    pointLight.position.set(-1.5, 1.5, 0.5);
    scene.add(pointLight);

    // VRM Loader
    const loader = new GLTFLoader();
    loader.register((parser) => new VRMLoaderPlugin(parser, { autoUpdateHumanBones: true }));
    
    loader.load('./gem.vrm', (gltf) => {
        const vrm = gltf.userData.vrm as VRM;
        vrmRef.current = vrm;
        vrm.scene.rotation.y = 0; // Set initial rotation
        vrm.scene.position.y = 0; // Set initial y position to be on the floor
        scene.add(vrm.scene);
        
        for (const boneName of Object.values(VRMHumanBoneName)) {
            const node = vrm.humanoid.getNormalizedBoneNode(boneName);
            if (node) initialBoneTransforms.current[boneName] = { position: node.position.clone(), quaternion: node.quaternion.clone() };
        }
    }, undefined, console.error);

    let frameId: number;
    const animate = () => {
        frameId = requestAnimationFrame(animate);
        const delta = clockRef.current.getDelta();
        const elapsedTime = clockRef.current.getElapsedTime();
        const vrm = vrmRef.current;

        if(vrm) {
            // Make avatar face the camera
            const angle = Math.atan2(
                vrm.scene.position.x - camera.position.x,
                vrm.scene.position.z - camera.position.z
            );
            vrm.scene.rotation.y = angle + Math.PI;

            const { expressionManager, humanoid } = vrm;

            // Lip Sync
            if (analyserNode && expressionManager) {
                if (!audioDataArray.current) {
                    audioDataArray.current = new Uint8Array(analyserNode.frequencyBinCount);
                }
                analyserNode.getByteFrequencyData(audioDataArray.current);
                
                let sum = 0;
                for (const amplitude of audioDataArray.current) {
                    sum += amplitude * amplitude;
                }
                const volume = Math.sqrt(sum / audioDataArray.current.length) / 128.0; // Normalize
                const mouthOpen = Math.min(volume * 2.5, 1.0); // Clamp and amplify
                
                // Smooth the movement
                smoothedVolume.current = THREE.MathUtils.lerp(smoothedVolume.current, mouthOpen, 0.5);
                // FIX: The correct expression preset for the 'ah' sound is 'Aa', not 'A'.
                expressionManager.setValue(VRMExpressionPresetName.Aa, smoothedVolume.current);
            } else {
                 // Decay mouth opening when no audio
                 smoothedVolume.current = THREE.MathUtils.lerp(smoothedVolume.current, 0, 0.5);
                 // FIX: The correct expression preset for the 'ah' sound is 'Aa', not 'A'.
                 expressionManager?.setValue(VRMExpressionPresetName.Aa, smoothedVolume.current);
            }

            // Expression interpolation
            if (expressionManager) {
                const presetsToUpdate: VRMExpressionPresetName[] = [
                    VRMExpressionPresetName.Happy,
                    VRMExpressionPresetName.Sad,
                    VRMExpressionPresetName.Surprised,
                ];

                presetsToUpdate.forEach(presetName => {
                    const currentVal = expressionManager.getValue(presetName) ?? 0;
                    const targetVal = targetExpressionsRef.current[presetName] ?? 0;
                    if (Math.abs(currentVal - targetVal) > 0.01) {
                        const interpolatedVal = THREE.MathUtils.lerp(currentVal, targetVal, 0.1);
                        expressionManager.setValue(presetName, interpolatedVal);
                    } else if (currentVal !== targetVal) {
                        expressionManager.setValue(presetName, targetVal); // Snap to target when close
                    }
                });
            }

            // Blinking
             if (isBlinking.current) {
                if (elapsedTime - blinkStartTime.current > 0.1) {
                    expressionManager.setValue(VRMExpressionPresetName.Blink, 0);
                    isBlinking.current = false;
                    nextBlinkTime.current = elapsedTime + 2.5 + Math.random() * 5;
                }
            } else if (elapsedTime > nextBlinkTime.current) {
                isBlinking.current = true;
                blinkStartTime.current = elapsedTime;
                expressionManager.setValue(VRMExpressionPresetName.Blink, 1.0);
            }

            // Pose interpolation
            const currentTargetPoseName = targetPoseRef.current;
            const interpolationFactor = 0.1;
            for (const boneNameStr in initialBoneTransforms.current) {
                const boneName = boneNameStr as VRMHumanBoneName;
                const boneNode = humanoid.getNormalizedBoneNode(boneName);
                const initialTransform = initialBoneTransforms.current[boneName];

                if (boneNode && initialTransform) {
                    const targetPoseData = poses[currentTargetPoseName]?.[boneName];
                    const neutralPoseData = poses.NEUTRAL[boneName];
                    const finalPoseData = targetPoseData || neutralPoseData;
                    const targetQuaternion = new THREE.Quaternion();

                    if (finalPoseData?.rotation) {
                        targetQuaternion.setFromEuler(finalPoseData.rotation);
                    } else {
                        targetQuaternion.copy(initialTransform.quaternion);
                    }
                    boneNode.quaternion.slerp(targetQuaternion, interpolationFactor);
                }
            }
             
            // Procedural idle animation
            const spineBone = humanoid.getNormalizedBoneNode(VRMHumanBoneName.Spine);
            if (spineBone) {
                const breath = Math.sin(elapsedTime * 1.5) * 0.02;
                spineBone.quaternion.multiply(new THREE.Quaternion().setFromEuler(new THREE.Euler(breath, 0, 0)));
            }

            const hipsBone = humanoid.getNormalizedBoneNode(VRMHumanBoneName.Hips);
            if (hipsBone) {
                const sway = Math.sin(elapsedTime * 0.5) * 0.01;
                hipsBone.quaternion.multiply(new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, sway)));
            }

            const headBone = humanoid.getNormalizedBoneNode(VRMHumanBoneName.Head);
            if (headBone) {
                const headSway = Math.sin(elapsedTime * 0.7) * 0.025;
                headBone.quaternion.multiply(new THREE.Quaternion().setFromEuler(new THREE.Euler(0, headSway, 0)));
            }

            // Ragdoll arm animation for NEUTRAL state
            if (currentTargetPoseName === 'NEUTRAL') {
                const rightUpperArm = humanoid.getNormalizedBoneNode(VRMHumanBoneName.RightUpperArm);
                const leftUpperArm = humanoid.getNormalizedBoneNode(VRMHumanBoneName.LeftUpperArm);
                const rightLowerArm = humanoid.getNormalizedBoneNode(VRMHumanBoneName.RightLowerArm);
                const leftLowerArm = humanoid.getNormalizedBoneNode(VRMHumanBoneName.LeftLowerArm);

                // A gentle forward-backward swing on the X-axis
                const upperArmSway = Math.sin(elapsedTime * 1.2) * 0.05; 
                const lowerArmSway = Math.sin(elapsedTime * 0.9 + 0.5) * 0.1;

                if (rightUpperArm) {
                    rightUpperArm.quaternion.multiply(new THREE.Quaternion().setFromEuler(new THREE.Euler(upperArmSway, 0, 0)));
                }
                if (leftUpperArm) {
                    leftUpperArm.quaternion.multiply(new THREE.Quaternion().setFromEuler(new THREE.Euler(upperArmSway, 0, 0)));
                }
                if (rightLowerArm) {
                    rightLowerArm.quaternion.multiply(new THREE.Quaternion().setFromEuler(new THREE.Euler(lowerArmSway, 0, 0)));
                }
                if (leftLowerArm) {
                    leftLowerArm.quaternion.multiply(new THREE.Quaternion().setFromEuler(new THREE.Euler(lowerArmSway, 0, 0)));
                }
            }
            
            vrm.update(delta);
        }
        renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
        if (currentMount) {
            camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        }
    }
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
      if (currentMount && renderer.domElement) currentMount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [poses, analyserNode]);

  return <div ref={mountRef} className="absolute inset-0" />;
};

export default AvatarView;