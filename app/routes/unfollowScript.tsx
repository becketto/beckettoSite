import {
    Box,
    Heading,
    Text,
    VStack,
    Link,
    Container,
    Image,
    Card,
    Button,
    Code,
    Icon,
    HStack,
    Alert
} from "@chakra-ui/react"
// import type { Route } from "./+types/unfollowScript"
import { FiExternalLink, FiCopy, FiCheck } from "react-icons/fi"
import { useState } from "react"

export function meta() {
    return [
        { title: "Auto-Confirm Unfollow Script for X (Twitter) - Beckett Oliphant" },
        { name: "description", content: "Learn how to install and use a Tampermonkey script to automatically confirm unfollow actions on X.com, making bulk unfollowing easier." },
    ]
}

const userScript = `// ==UserScript==
// @name         Auto-Confirm Unfollow on X
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Automatically confirms unfollow actions on X.com to skip the dialog during manual unfollowing.
// @author       Beckett
// @match        https://x.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Use a MutationObserver to watch for changes in the DOM (e.g., when the confirmation dialog appears).
    const observer = new MutationObserver((mutations) => {
        console.log('observer');
        for (const mutation of mutations) {
            for (const node of mutation.addedNodes) {
                if (node instanceof HTMLElement) {
                    // Look for the confirmation button using its current data-testid attribute.
                    const confirmButton = node.querySelector('[data-testid="confirmationSheetConfirm"]');
                    if (confirmButton) {
                        console.log("confirm button identified");
                        confirmButton.click();
                        // Optional: You can add a short delay if needed, e.g., setTimeout(() => confirmButton.click(), 100);
                    }
                }
            }
        }
    });

    // Observe the entire document for added nodes (subtree for nested elements).
    observer.observe(document.body, { childList: true, subtree: true });
})();`

export default function UnfollowScript() {
    const [copied, setCopied] = useState(false)

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(userScript)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error('Failed to copy text: ', err)
        }
    }

    return (
        <Box bg="gray.900" minH="100vh" color="white">
            <Container maxW="container.md" py={{ base: "8", md: "16" }} px={{ base: "4", md: "6" }}>
                <VStack align="start" gap={{ base: "6", md: "8" }} fontSize={{ base: "md", md: "lg" }}>

                    {/* Header */}
                    <Box w="100%">
                        <Link href="/" color="blue.300" fontSize="sm" mb="4" display="inline-block">
                            ← Back to home
                        </Link>
                        <Heading size="xl" mb="4">Auto-Confirm Unfollow Script for X (Twitter)</Heading>
                        <Text color="gray.400" fontSize="lg">
                            Skip the confirmation dialog when unfollowing people on X.com with this simple Tampermonkey script.
                        </Text>
                    </Box>

                    <Box w="100%">
                        <Heading size="md" mb="4">Tutorial</Heading>
                        <Image
                            src="https://cdn.shopify.com/s/files/1/0830/0947/0774/files/unfollow.gif?v=1756676777"
                            alt="Auto-unfollow script demonstration"
                            borderRadius="md"
                            w="100%"
                            maxW="600px"
                        />
                    </Box>
                    <Heading size="xl" mb="6" textDecoration="underline">I don't claim responsibility for any effects of this script. Use at your own risk.</Heading>

                    {/* Instructions */}
                    <Box w="100%">
                        <Heading size="lg" mb="6">How to Install & Use</Heading>

                        <Box as="ol" fontSize={{ base: "md", md: "lg" }} pl="6" css={{ listStyleType: "decimal", "& li": { marginBottom: "1.5rem" }, "& li::marker": { color: "#63b3ed" } }}>
                            <Box as="li" mb="6">
                                <Text fontWeight="bold" mb="2">Install Tampermonkey</Text>
                                <Text color="gray.400" mb="3">
                                    First, install the Tampermonkey browser extension:
                                </Text>
                                <Link
                                    href="https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    color="blue.300"
                                    display="inline-flex"
                                    alignItems="center"
                                    bg="gray.800"
                                    px="3"
                                    py="2"
                                    borderRadius="md"
                                    _hover={{ bg: "gray.700" }}
                                >
                                    Install Tampermonkey for Chrome
                                    <Icon as={FiExternalLink} ml="2" boxSize="4" />
                                </Link>
                            </Box>

                            <Box as="li" mb="6">
                                <Text fontWeight="bold" mb="2">Allow User Scripts</Text>
                                <Text color="gray.400">
                                    After installing Tampermonkey, make sure user scripts are enabled in the extension settings.
                                </Text>
                            </Box>

                            <Box as="li" mb="6">
                                <Text fontWeight="bold" mb="2">Create New Script</Text>
                                <Text color="gray.400" mb="3">
                                    Click on the Tampermonkey icon in your browser and select "Create a new script". Then paste the script below:
                                </Text>

                                <Card.Root bg="gray.800" w="100%">
                                    <Card.Header>
                                        <HStack justify="space-between" w="100%">
                                            <Text fontWeight="bold">Userscript Code</Text>
                                            <Button
                                                size="sm"
                                                onClick={copyToClipboard}
                                                bg={copied ? "green.600" : "blue.600"}
                                                color="white"
                                                _hover={{ bg: copied ? "green.700" : "blue.700" }}

                                            >
                                                <Icon as={copied ? FiCheck : FiCopy} mr="2" />
                                                {copied ? "Copied!" : "Copy Script"}
                                            </Button>
                                        </HStack>
                                    </Card.Header>
                                    <Card.Body pt="0">
                                        <Code
                                            display="block"
                                            whiteSpace="pre-wrap"
                                            p="4"
                                            borderRadius="md"
                                            bg="gray.900"
                                            color="gray.100"
                                            fontSize="sm"
                                            w="100%"
                                            overflowX="auto"
                                        >
                                            {userScript}
                                        </Code>
                                    </Card.Body>
                                </Card.Root>
                            </Box>

                            <Box as="li" mb="6">
                                <Text fontWeight="bold" mb="2">Enable the Script</Text>
                                <Text color="gray.400">
                                    Save the script (Ctrl+S or Cmd+S) and make sure it's enabled in your Tampermonkey dashboard.
                                    The script will now automatically work on X.com.
                                </Text>
                            </Box>

                            <Box as="li" mb="6">
                                <Text fontWeight="bold" mb="2">If it doesn't work</Text>
                                <Text color="gray.400">
                                    Restart tampermonkey by going to &gt; tampermonkey &gt; dashboard &gt; settings <br />
                                    Set <u>Config Mode</u> to "advanced", scroll to bottom, click "restart tampermonkey".
                                </Text>
                            </Box>
                        </Box>
                    </Box>
                </VStack>
            </Container>
        </Box>
    )
}
