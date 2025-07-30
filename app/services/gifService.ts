import { parseGIF, decompressFrames } from "gifuct-js"

export interface GifFrame {
    dims: {
        width: number
        height: number
        left: number
        top: number
    }
    delay: number
    patch: Uint8ClampedArray
    disposalType: number
}

export class GifPlayer {
    private canvas: HTMLCanvasElement
    private ctx: CanvasRenderingContext2D
    private frames: GifFrame[] = []
    private animationRef: number | null = null
    private startTimeRef: number | null = null
    private frameIndexRef: number = 0
    private speed: number = 1

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas
        const ctx = canvas.getContext("2d")
        if (!ctx) {
            throw new Error("Could not get 2D context from canvas")
        }
        this.ctx = ctx
    }

    async loadGif(url: string): Promise<void> {
        try {
            const response = await fetch(url)
            const buffer = await response.arrayBuffer()
            const gif = parseGIF(buffer)
            this.frames = decompressFrames(gif, true) as GifFrame[]

            // Set canvas size based on first frame
            if (this.frames.length > 0) {
                this.canvas.width = this.frames[0].dims.width
                this.canvas.height = this.frames[0].dims.height
            }
        } catch (error) {
            console.error("Error loading GIF:", error)
            throw error
        }
    }

    play(): void {
        if (this.frames.length === 0) return

        // Calculate total duration of one loop (in ms)
        const totalDuration = this.frames.reduce((sum, frame) => sum + frame.delay, 0)
        let lastFrame: GifFrame | null = null

        const loop = (currentTime: number) => {
            if (!this.startTimeRef) {
                this.startTimeRef = currentTime
            }

            // Calculate elapsed time adjusted for speed
            const elapsed = (currentTime - this.startTimeRef) * this.speed
            const normalizedTime = elapsed % totalDuration // Time within one loop
            let accumulatedTime = 0
            let currentFrameIndex = 0

            // Find the current frame based on normalized time
            for (let i = 0; i < this.frames.length; i++) {
                accumulatedTime += this.frames[i].delay
                if (normalizedTime < accumulatedTime) {
                    currentFrameIndex = i
                    break
                }
            }

            // Only draw if frame changed to avoid redundant draws
            if (currentFrameIndex !== this.frameIndexRef || !lastFrame) {
                const frame = this.frames[currentFrameIndex]

                // Handle disposal
                if (lastFrame && lastFrame.disposalType === 2) {
                    this.ctx.clearRect(
                        lastFrame.dims.left,
                        lastFrame.dims.top,
                        lastFrame.dims.width,
                        lastFrame.dims.height
                    )
                }

                // Draw current frame
                const imageData = this.ctx.createImageData(frame.dims.width, frame.dims.height)
                imageData.data.set(frame.patch)
                this.ctx.putImageData(imageData, frame.dims.left, frame.dims.top)

                lastFrame = frame
                this.frameIndexRef = currentFrameIndex
            }

            // Schedule next frame
            this.animationRef = requestAnimationFrame(loop)
        }

        // Start the loop
        this.animationRef = requestAnimationFrame(loop)
    }

    setSpeed(newSpeed: number): void {
        this.speed = newSpeed

        if (this.startTimeRef && this.frames.length > 0) {
            // Adjust startTime to maintain current position
            const currentTime = performance.now()
            const totalDuration = this.frames.reduce((sum, frame) => sum + frame.delay, 0)
            const elapsed = (currentTime - this.startTimeRef) * this.speed
            const normalizedTime = elapsed % totalDuration
            this.startTimeRef = currentTime - normalizedTime / newSpeed
        }
    }

    stop(): void {
        if (this.animationRef) {
            cancelAnimationFrame(this.animationRef)
            this.animationRef = null
        }
    }

    destroy(): void {
        this.stop()
        this.frames = []
        this.startTimeRef = null
        this.frameIndexRef = 0
    }
}