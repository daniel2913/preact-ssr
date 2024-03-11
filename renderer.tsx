import { uneval } from 'devalue'
import {useRef} from "preact/compat"
import { prerender } from 'preact-iso'
import dehydrator from './exp/dehydrator'
import React from "preact/compat"

// The @fastify/vite renderer overrides
export default {
  createRenderFunction,
  createRoute
}

function createRoute ({ handler, errorHandler, route }, scope, config) {
  if (route.getServerSideProps) {
    // If getServerSideProps is provided, register JSON endpoint for it
    scope.get(`/json${route.path}`, async (req, reply) => {
      reply.send(await route.getServerSideProps({
        req,
        ky: scope.ky
      }))
    })
  }
  scope.get(route.path, {
    // If getServerSideProps is provided,
    // make sure it runs before the SSR route handler
    ...route.getServerSideProps && {
      async preHandler (req, reply) {
        req.serverSideProps = await route.getServerSideProps({
          req,
          ky: scope.ky
        })
      }
    },
    handler,
    errorHandler,
    ...route
  })
}

function createRenderFunction ({ createApp }) {
  // createApp is exported by client/index.js
  return async ({ app: server, req, reply }) => {
    // Server data that we want to be used for SSR
    // and made available on the client for hydration
    const serverSideProps = await req.serverSideProps
    // Creates main React component with all the SSR context it needs
    // Perform SSR, i.e., turn app.instance into an HTML fragment
    const {html:element,links} = await prerender(createApp ,{props:{serverSideProps, server, req, reply}})
    return {
      // Server-side rendered HTML fragment
      element,
      // The SSR context data is also passed to the template, inlined for hydration
      hydration: `<script>window.hydration = ${uneval({ serverSideProps })}</script>`
    }
  }
}
