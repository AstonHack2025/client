"use client";

import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { CollaborativeEditor } from "./CollaborativeEditor";

export default function App() {
  return (
    <LiveblocksProvider publicApiKey={"pk_dev_ov3k1e6MxtB2s4EzYHL7TKOaBTOzop6hqbq8uIMlTTLGdRaRvmA2E4RXXlUO9dXd"}>
      <RoomProvider id="my-room">
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          <CollaborativeEditor />
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}