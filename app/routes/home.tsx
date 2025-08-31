import {
  Box,
  Heading,
  Text,
  VStack,
  Link,
  Container,
  Image,
  Card,
  SimpleGrid,
  Icon,
  Slider
} from "@chakra-ui/react"
import type { Route } from "./+types/home"
import { FiExternalLink } from "react-icons/fi"
import { useState, useRef, useEffect } from "react"
import { GifPlayer } from "../services/gifService"

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Beckett Oliphant" },
    { name: "description", content: "Shopify developer working on Affilitrak and other projects." },
  ]
}

export default function Home() {
  const [gifSpeed, setGifSpeed] = useState(1)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const gifPlayerRef = useRef<GifPlayer | null>(null)

  useEffect(() => {
    const gifUrl = "https://cdn.shopify.com/s/files/1/0830/0947/0774/files/beckettSpinsSmall.gif?v=1753905746"

    if (canvasRef.current) {
      const gifPlayer = new GifPlayer(canvasRef.current)
      gifPlayerRef.current = gifPlayer

      gifPlayer.loadGif(gifUrl)
        .then(() => {
          gifPlayer.play()
        })
        .catch((error) => console.error("Error loading GIF:", error))
    }

    return () => {
      if (gifPlayerRef.current) {
        gifPlayerRef.current.destroy()
      }
    }
  }, [])

  // Update speed without restarting
  useEffect(() => {
    if (gifPlayerRef.current) {
      gifPlayerRef.current.setSpeed(gifSpeed)
    }
  }, [gifSpeed])

  return (
    <Box bg="gray.900" minH="100vh" color="white">
      <Container maxW="container.md" py={{ base: "8", md: "16" }} px={{ base: "4", md: "6" }}>
        <VStack align="start" gap={{ base: "6", md: "8" }} fontSize={{ base: "md", md: "lg" }}>

          <Image
            src="https://cdn.shopify.com/s/files/1/0830/0947/0774/files/lighthousePfp.png?v=1755030786"
            alt="Beckett Oliphant"
            borderRadius="full"
            boxSize={{ base: "120px", md: "150px" }}
            mx="auto"
          />

          <Box
            flexDirection={{ base: "column", md: "row" }}
            alignItems="center"
            gap="4"
            w="100%"
          >
            <Heading size="xl">hi i'm beckett :)</Heading>
            <Box>
              <canvas
                ref={canvasRef}
                style={{
                  borderRadius: "md",
                  width: "200px",
                  height: "auto",
                }}
              />
              <Box w={{ base: "200px", md: "200px" }} mt="3">
                <Text fontSize="sm" color="gray.400" mb="2">
                  Speed: {gifSpeed.toFixed(1)}x
                </Text>
                <Slider.Root
                  width="200px"
                  value={[gifSpeed]}
                  onValueChange={(details) => setGifSpeed(details.value[0])}
                  min={0.1}
                  max={25}
                  step={0.1}
                >
                  <Slider.Control>
                    <Slider.Track>
                      <Slider.Range />
                    </Slider.Track>
                    <Slider.Thumbs />
                  </Slider.Control>
                </Slider.Root>
              </Box>
            </Box>
          </Box>

          <Box w="100%">
            <Text fontWeight="bold">currently working on:</Text>
            <Link href="https://apps.shopify.com/affilitrak" target="_blank" rel="noopener noreferrer" color="blue.300">
              affilitrak (shopify app)
            </Link>
          </Box>

          <Box w="100%">
            <Card.Root bg="gray.800" mt="4" w="100%" overflow="hidden">
              <Card.Body p={{ base: "4", md: "6" }}>
                <Box
                  display="flex"
                  flexDirection={{ base: "column", md: "row" }}
                  alignItems={{ base: "center", md: "center" }}
                  gap={{ base: "4", md: "6" }}
                  mb="4"
                  w="100%"
                >
                  <Image
                    src="https://cdn.shopify.com/s/files/1/0830/0947/0774/files/AffilitrakLogo1_c3663d38-fcd5-407c-b6f7-a81c407c1351.jpg?v=1753050083"
                    alt="Affilitrak Logo"
                    boxSize={{ base: "120px", md: "150px" }}
                    flexShrink="0"
                    borderRadius="15px"
                  />
                  <Box textAlign={{ base: "center", md: "left" }} flex="1" minW="0">
                    <Heading size="md" mb="3">Affilitrak</Heading>
                    <Text fontSize="sm" color="gray.400" wordBreak="break-word">Simple affiliate marketing app for Shopify. Track referrals, manage affiliates, auto-pay commissions.</Text>
                    <Text fontSize="sm" color="gray.400" mt="2" wordBreak="break-word">Features: Custom commissions, coupon tracking, PayPal integration, multi-level marketing.</Text>
                    <Text fontSize="sm" color="gray.400" mt="2">Rating: 5.0 (6 reviews)</Text>
                    <Link href="https://apps.shopify.com/affilitrak" color="blue.300" fontSize="sm" display="inline-flex" alignItems="center" mt="2" flexWrap="wrap" target="_blank">
                      View on Shopify App Store
                      <Icon as={FiExternalLink} ml="1" boxSize="3" />
                    </Link>
                  </Box>
                </Box>
              </Card.Body>
            </Card.Root>
          </Box>

          <Box w="100%">
            <Text fontWeight="bold">blog posts:</Text>
            <SimpleGrid columns={{ base: 1, md: 2 }} gap="4" mt="4">
              <Card.Root asChild bg="gray.800" _hover={{ bg: "gray.700" }} transition="background 0.2s">
                <Link href="/unfollow-script">
                  <Card.Header>
                    <Heading size="md">Auto-Confirm Unfollow Script for X</Heading>
                  </Card.Header>
                  <Card.Body>
                    <Text fontSize="sm" color="gray.400">Skip the confirmation dialog when unfollowing people on X.com with this Tampermonkey script.</Text>
                  </Card.Body>
                </Link>
              </Card.Root>
            </SimpleGrid>
            <Link href="/shopify" color="blue.300" fontSize="sm" mt="2" display="block">See all posts →</Link>
          </Box>

          <Box w="100%">
            <Text fontWeight="bold">what's this site for?</Text>
            <Text>mainly to show off my projects and to act as a homepage for my shopify blog. i'm not looking for work, just showing my stuff :)</Text>
          </Box>

          <Box w="100%">
            <Text fontWeight="bold">my projects:</Text>
            <Box as="ul" pl="4" listStyleType="disc" mt="4">
              <Box as="li">
                <Link href="https://github.com/becketto/eloTemplate" target="_blank" rel="noopener noreferrer" color="blue.300">
                  ELO Template - TypeScript Starter
                </Link>
              </Box>
              <Box as="li">
                <Link href="https://github.com/becketto/fileUploadShopify" target="_blank" rel="noopener noreferrer" color="blue.300">
                  Shopify File Upload Tool
                </Link>
              </Box>
              <Box as="li">
                <Link href="https://github.com/becketto/orbitSim" target="_blank" rel="noopener noreferrer" color="blue.300">
                  Orbit Simulator
                </Link>
              </Box>
              <Box as="li">
                <Link href="https://github.com/becketto/editUIShopifyPLRS" target="_blank" rel="noopener noreferrer" color="blue.300">
                  Shopify UI Editor
                </Link>
              </Box>
            </Box>
            <Link href="https://github.com/becketto" target="_blank" rel="noopener noreferrer" color="blue.300" fontSize="sm" mt="2" display="block">
              See more on GitHub →
            </Link>
          </Box>

          <Box w="100%">
            <Text fontWeight="bold">my stack</Text>
            <Text>typescript, remix, prisma (with postgres), react, chakra or polaris for ui</Text>
          </Box>

          <Box w="100%">
            <Text fontWeight="bold">my twitter:</Text>
            <Link href="https://x.com/ecombeckett" target="_blank" rel="noopener noreferrer" color="blue.300">
              https://x.com/ecombeckett
            </Link>
          </Box>

          <Box w="100%">
            <Text fontWeight="bold">my youtube channel:</Text>
            <Link href="https://www.youtube.com/@beckettoliphant" target="_blank" rel="noopener noreferrer" color="blue.300">
              https://www.youtube.com/@beckettoliphant
            </Link>
          </Box>

          <Box w="100%" mt="6">
            <Text mb="4">here's the macbook with a broken screen in the corner of my room that i'm using to host this website</Text>
            <Image
              src="https://cdn.shopify.com/s/files/1/0830/0947/0774/files/IMG_7440.jpg?v=1753909349"
              alt="MacBook with broken screen"
              boxSize={{ base: "220px", md: "250px" }}
              borderRadius="md"
            />
          </Box>

        </VStack>
      </Container>
    </Box>
  )
}

