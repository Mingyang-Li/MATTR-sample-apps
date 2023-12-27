import { prisma } from "@/server/db";
import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

const PresentationResponsePayloadSchema = z.object({
  presentationType: z.string(),
  challengeId: z.string(),
  verified: z.boolean(),
  holder: z.string(),
  claims: z.any(),
});

/**
 * Processing response payload against each PresentationRequest stored in the DB
 * 1. Validate payload req.body -> body
 * 2. Extract challengeId from body -> challenge
 * 3. Convert body into string -> RESPONSE
 * 4. Find PresentationRequest from DB where challenge === challengeId -> ROW
 * 5. Update ROW.response with RESPONSE
 * 6. Return 201 response with success message
 *
 * Note:
 * Response status needs to be a 200-level response
 * This is notify the wallet that it has INDEED sent out the presentation-response payload to this endpoint (callback URL)
 * @param req
 * @param res
 */
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Validate request body
    const body = PresentationResponsePayloadSchema.parse(req.body);

    // Extract challengeId
    const { challengeId } = body;

    // Find DB row where PresentationRequest.challenge === challengeId
    const row = await prisma.presentationRequest.findFirst({
      where: { challenge: { equals: challengeId } },
      select: { id: true },
    });
    console.log(`ROW -> ${JSON.stringify(row)}`);

    // Extract claims from request body
    const claims = body.claims as unknown;

    // Convert claims from JSON to string
    const response = JSON.stringify(claims);

    // Update PresentationRequest.response
    const updatedPresentationRequest = await prisma.presentationRequest.update({
      where: { id: row?.id },
      data: { response },
      select: { id: true },
    });

    // Return status
    const message = `Updated PresentationRequest for ${updatedPresentationRequest.id}`;
    res.status(201).json({ message });
  } catch (e) {
    const message = `Received payload, but failed to store to database. Error: ${JSON.stringify(
      e
    )}`;
    console.log(message);
    res.status(202).json({ message });
  }
};

export default handler;