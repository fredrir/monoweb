"use client"

import { MantineProvider as MantineCoreProvider } from "@mantine/core"
import { Notifications } from "@mantine/notifications"
import type { FC, PropsWithChildren } from "react"
import { ModalProvider } from "./ModalProvider"

export const MantineProvider: FC<PropsWithChildren> = ({ children }) => (
  <MantineCoreProvider>
    <Notifications />
    <ModalProvider>{children}</ModalProvider>
  </MantineCoreProvider>
)
