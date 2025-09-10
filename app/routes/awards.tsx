import {
    Box,
    Heading,
    Text,
    VStack,
    Container,
    Spinner,
    Card
} from "@chakra-ui/react"
import type { Route } from "../+types/template"

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Template Page" },
        { name: "description", content: "A template page using Chakra UI." },
    ]
}

export async function loader() {
    console.log("hello world")
    // Simulate some loading time
    // await new Promise(resolve => setTimeout(resolve, 1000))
    return { message: "Template loaded successfully!" }
}

export default function Template({ loaderData }: Route.ComponentProps) {
    return (
        <Box bg="gray.900" minH="100vh" color="white">
            <Container maxW="container.md" py={{ base: "8", md: "16" }} px={{ base: "4", md: "6" }}>
                <VStack align="center" gap={{ base: "6", md: "8" }} fontSize={{ base: "md", md: "lg" }}>

                    <Heading size="2xl" textAlign="center">
                        Give me a bit i have to make the award page first smh
                    </Heading>

                    {/* <Card.Root bg="gray.800" w="100%" maxW="md">
                        <Card.Body p="6">
                            <VStack gap="4">
                                <Spinner size="lg" color="blue.400" />
                                <Text textAlign="center" color="gray.300">
                                    This is a template page using Chakra UI
                                </Text>
                                <Text fontSize="sm" color="gray.400" textAlign="center">
                                    Loader message: {loaderData.message}
                                </Text>
                            </VStack>
                        </Card.Body>
                    </Card.Root>

                    <Box textAlign="center">
                        <Text color="gray.400">
                            Check the console to see the "hello world" message from the loader!
                        </Text>
                    </Box> */}

                </VStack>
            </Container>
        </Box>
    )
}
