import { Box, Button, Heading, Input, HStack, VStack, Text, Link } from "@chakra-ui/react"
import { Form, useNavigate, useNavigation, Link as RemixLink } from "react-router"
import LoadingScreen from "../components/LoadingScreen"

export function meta() {
  return [
    { title: "Slop Score" },
  ]
}

export default function Home() {
  // Toggle this to enable/disable credits mode
  const outOfCredits = false;

  const navigate = useNavigate();
  const navigation = useNavigation();

  // Show loading screen when navigating to analysis
  if (navigation.state === "loading" && navigation.location?.pathname.includes("/analysis/")) {
    return <LoadingScreen />;
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get("username") as string;

    if (username) {
      navigate(`/slop-score/analysis/${username}`);
    }
  };

  return (
    <Box
      minH="100vh"
      bg="gray.900"
      color="white"
      p="8"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <VStack gap="8" w="full" maxW="lg">
        {/* Main Card */}
        <Box
          bg="gray.800"
          borderColor="gray.700"
          borderWidth="1px"
          w="full"
          boxShadow="0px 0px 50px -12px rgba(0, 0, 0, 0.5)"
          borderRadius="3xl"
          p="8"
        >
          <VStack gap="6" textAlign="center">
            {/* Header */}
            <VStack gap="3">
              <Heading
                fontSize={{ base: "3xl", md: "4xl" }}
                fontWeight="medium"
                color="white"
              >
                Get Your Slop Score
              </Heading>
            </VStack>

            {/* Input Form */}
            <Box w="full" maxW="400px">
              <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                <HStack w="full" gap="2">
                  <Text fontSize="lg" color="gray.300" minW="6">@</Text>
                  <Input
                    name="username"
                    placeholder="username"
                    bg="gray.700"
                    border="1px solid"
                    borderColor="gray.600"
                    borderRadius="full"
                    _hover={{ borderColor: "gray.500" }}
                    _focus={{
                      borderColor: "blue.400",
                      boxShadow: "0 0 0 1px #3182CE",
                      bg: "gray.700"
                    }}
                    color="white"
                    _placeholder={{ color: "gray.400" }}
                    flex="1"
                    h="48px"
                    fontSize="md"
                    required
                  />
                  <Button
                    type="submit"
                    bg={outOfCredits ? "gray.500" : "white"}
                    color={outOfCredits ? "gray.300" : "black"}
                    _hover={outOfCredits ? { bg: "gray.500", cursor: "not-allowed" } : { bg: "gray.100" }}
                    _active={outOfCredits ? { bg: "gray.500" } : { bg: "gray.200" }}
                    borderRadius="full"
                    h="48px"
                    px={{ base: "4", md: "6" }}
                    fontSize="md"
                    fontWeight="medium"
                    minW={{ base: "80px", md: "auto" }}
                    disabled={outOfCredits}
                  >
                    Analyze
                  </Button>
                </HStack>
              </form>
            </Box>

          </VStack>
        </Box>

        {/* Navigation Links */}
        <HStack gap="6">
          <RemixLink to="/slop-score/leaderboard">
            <Link color="blue.400" textDecoration="underline" fontSize="md">
              View Leaderboard
            </Link>
          </RemixLink>
          <RemixLink to="/slop-score/calc-logic">
            <Link color="blue.400" textDecoration="underline" fontSize="md">
              Calculation Logic
            </Link>
          </RemixLink>
        </HStack>

        {/* Donation Message */}
        {outOfCredits ? (
          <Box
            w="full"
            maxW="lg"
            bg="blue.900"
            borderColor="blue.600"
            borderWidth="1px"
            borderRadius="lg"
            p="4"
            textAlign="center"
          >
            <Text fontSize="sm" color="blue.200">
              Ran out of credits, will put money from this link towards credits. Supporters over $5 will be listed below.{" "}
              <Link
                href="https://buymeacoffee.com/ecombeckett"
                target="_blank"
                rel="noopener noreferrer"
                color="blue.300"
                textDecoration="underline"
                _hover={{ color: "blue.100" }}
              >
                https://buymeacoffee.com/ecombeckett
              </Link>
            </Text>
          </Box>
        ) : (
          <Box textAlign="center">
            <Text fontSize="sm" color="gray.400">
              Buy more credits ($5+ gets your name and link below):{" "}
              <Link
                href="https://buymeacoffee.com/ecombeckett"
                target="_blank"
                rel="noopener noreferrer nofollow"
                color="blue.400"
                _hover={{ color: "blue.300", textDecoration: "underline" }}
              >
                Buy me a coffee
              </Link>
            </Text>
          </Box>
        )}

        {/* Creator Credit */}
        <Box textAlign="center">
          <Text fontSize="sm" color="gray.400">
            Created by{" "}
            <Link
              href="https://x.com/ecombeckett"
              target="_blank"
              rel="noopener noreferrer"
              color="blue.400"
              _hover={{ color: "blue.300", textDecoration: "underline" }}
            >
              @ecombeckett
            </Link>
            {" • "}
            <Link
              href="https://becketto.com"
              target="_blank"
              rel="noopener noreferrer"
              color="blue.400"
              _hover={{ color: "blue.300", textDecoration: "underline" }}
            >
              becketto.com
            </Link>
          </Text>
        </Box>

        {/* Supporters */}
        <Box textAlign="center">
          <Text fontSize="sm" color="gray.400">
            Supporters:{" "}
            {[
              { name: "@ecombeckett", url: "https://x.com/ecombeckett" },
              { name: "Affilitrak", url: "https://apps.shopify.com/affilitrak" },
              { name: "@hibakod", url: "https://x.com/hibakod" },
              { name: "@LilWriggle", url: "https://x.com/LilWriggle" },
              { name: "@the_jess_who", url: "https://x.com/the_jess_who" },
              { name: "@specialkdelslay", url: "https://x.com/specialkdelslay" },
              { name: "@Hermitual", url: "https://x.com/Hermitual" },
              { name: "@ubermummy", url: "https://x.com/ubermummy" },
              { name: "@haydendevs", url: "https://x.com/haydendevs" },
            ].map((supporter, index, array) => (
              <span key={supporter.name}>
                <Link
                  href={supporter.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  color="blue.400"
                  _hover={{ color: "blue.300", textDecoration: "underline" }}
                >
                  {supporter.name}
                </Link>
                {index < array.length - 1 ? ", " : ""}
              </span>
            ))}
          </Text>
        </Box>
      </VStack>
    </Box>
  )
}
