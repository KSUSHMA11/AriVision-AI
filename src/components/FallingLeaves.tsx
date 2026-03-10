import { useEffect, useRef } from "react";

interface Leaf {
    x: number;
    y: number;
    size: number;
    rotation: number;
    rotationSpeed: number;
    speed: number;
    drift: number;
    driftAngle: number;
    driftFrequency: number;
    opacity: number;
    color: string;
    shape: number; // 0-3 for different leaf shapes
}

const LEAF_COLORS = [
    "#4a7c59",
    "#2d6a4f",
    "#52b788",
    "#74c69d",
    "#95d5b2",
    "#6a994e",
    "#386641",
    "#a7c957",
    "#3a7d44",
    "#588157",
];

function createLeaf(canvasWidth: number): Leaf {
    return {
        x: Math.random() * canvasWidth,
        y: -30 - Math.random() * 100,
        size: 12 + Math.random() * 22,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.04,
        speed: 0.6 + Math.random() * 1.2,
        drift: Math.random() * 1.5,
        driftAngle: Math.random() * Math.PI * 2,
        driftFrequency: 0.01 + Math.random() * 0.015,
        opacity: 0.18 + Math.random() * 0.32,
        color: LEAF_COLORS[Math.floor(Math.random() * LEAF_COLORS.length)],
        shape: Math.floor(Math.random() * 4),
    };
}

function drawLeaf(ctx: CanvasRenderingContext2D, leaf: Leaf) {
    ctx.save();
    ctx.translate(leaf.x, leaf.y);
    ctx.rotate(leaf.rotation);
    ctx.globalAlpha = leaf.opacity;
    ctx.fillStyle = leaf.color;
    ctx.strokeStyle = leaf.color;
    ctx.lineWidth = 0.5;

    const s = leaf.size;

    ctx.beginPath();
    if (leaf.shape === 0) {
        // Oval leaf
        ctx.save();
        ctx.scale(1, 1.6);
        ctx.arc(0, 0, s / 2, 0, Math.PI * 2);
        ctx.restore();
        // Midrib
        ctx.moveTo(0, -s * 0.8);
        ctx.lineTo(0, s * 0.8);
        ctx.stroke();
    } else if (leaf.shape === 1) {
        // Classic leaf shape (bezier)
        ctx.moveTo(0, -s * 0.8);
        ctx.bezierCurveTo(s * 0.7, -s * 0.3, s * 0.7, s * 0.3, 0, s * 0.8);
        ctx.bezierCurveTo(-s * 0.7, s * 0.3, -s * 0.7, -s * 0.3, 0, -s * 0.8);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(0, -s * 0.8);
        ctx.lineTo(0, s * 0.8);
        ctx.globalAlpha = leaf.opacity * 0.5;
        ctx.stroke();
    } else if (leaf.shape === 2) {
        // Maple-style jagged leaf
        const points = 5;
        for (let i = 0; i < points; i++) {
            const angle = (i / points) * Math.PI * 2 - Math.PI / 2;
            const r = i % 2 === 0 ? s * 0.9 : s * 0.45;
            const px = Math.cos(angle) * r;
            const py = Math.sin(angle) * r;
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.fill();
    } else {
        // Simple round leaf
        ctx.arc(0, 0, s / 2.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(0, -s / 2.2);
        ctx.lineTo(0, s / 2.2);
        ctx.globalAlpha = leaf.opacity * 0.4;
        ctx.stroke();
    }

    ctx.restore();
}

const FallingLeaves = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const leavesRef = useRef<Leaf[]>([]);
    const animFrameRef = useRef<number>(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        // Initialize leaves staggered
        const LEAF_COUNT = 28;
        leavesRef.current = Array.from({ length: LEAF_COUNT }, (_, i) => {
            const leaf = createLeaf(canvas.width);
            // Spread initial positions vertically so they don't all start at top
            leaf.y = (canvas.height / LEAF_COUNT) * i - 30;
            return leaf;
        });

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            leavesRef.current.forEach((leaf) => {
                leaf.y += leaf.speed;
                leaf.x += Math.sin(leaf.driftAngle) * leaf.drift;
                leaf.driftAngle += leaf.driftFrequency;
                leaf.rotation += leaf.rotationSpeed;

                // Reset when off-screen
                if (leaf.y > canvas.height + 40) {
                    const fresh = createLeaf(canvas.width);
                    Object.assign(leaf, fresh);
                }

                drawLeaf(ctx, leaf);
            });

            animFrameRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animFrameRef.current);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                pointerEvents: "none",
                zIndex: 0,
            }}
        />
    );
};

export default FallingLeaves;
