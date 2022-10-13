![Seneca Provider](http://senecajs.org/files/assets/seneca-logo.png)

# @seneca/provider

> _Seneca Provider_ is a plugin for [Seneca](http://senecajs.org)

A plugin to support access to third party APIs. This is the base
plugin used by service-specific provider plugins (such as
[@seneca/github-provider](https://github.com/senecajs/seneca-github-provider))
to handle key management and other shared tasks.

[![npm version](https://img.shields.io/npm/v/@seneca/provider.svg)](https://npmjs.com/package/@seneca/provider)
[![build](https://github.com/senecajs/seneca-provider/actions/workflows/build.yml/badge.svg)](https://github.com/senecajs/seneca-provider/actions/workflows/build.yml)
[![Coverage Status](https://coveralls.io/repos/github/senecajs/seneca-provider/badge.svg?branch=main)](https://coveralls.io/github/senecajs/seneca-provider?branch=main)
[![Known Vulnerabilities](https://snyk.io/test/github/senecajs/seneca-provider/badge.svg)](https://snyk.io/test/github/senecajs/seneca-provider)
[![DeepScan grade](https://deepscan.io/api/teams/5016/projects/19459/branches/505694/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=5016&pid=19459&bid=505694)
[![Maintainability](https://api.codeclimate.com/v1/badges/ee603417bbb953d35ebe/maintainability)](https://codeclimate.com/github/senecajs/seneca-provider/maintainability)

| ![Voxgig](https://www.voxgig.com/res/img/vgt01r.png) | This open source module is sponsored and supported by [Voxgig](https://www.voxgig.com). |
| ---------------------------------------------------- | --------------------------------------------------------------------------------------- |

## Quick Example

```js
// Setup - get the key value (<SECRET>) separately from a vault or
// environment variable.
Seneca().use('provider')
```

## Install

```sh
$ npm install @seneca/provider
```

## Quick Example

```js
// Setup - get the key value (<SECRET>) separately from a vault or
// environment variable.
Seneca().use('provider', {
  provider: {
    AnExternalService: {
      keys: {
        KeyNameZero: {
          value: '<SECRET>',
        },
        KeyNameOne: {
          value: '<SECRET>',
        },
      },
    },
  },
})

// Later, get the key. Usually you would do this inside
// the Plugin preparation phase of a provider plugin:

function MyPlugin(options) {
  let externalServiceSDK = null

  this.prepare(async function () {
    let out = await this.post(
      'sys:provider,get:key,provider:AnExternalService,key:KeyNameZero'
    )
    if (!out.ok) {
      this.fail('api-key-missing')
    }

    let config = {
      auth: out.value,
    }

    externalServiceSDK = new ExternalServiceSDK(config)
  })
}
```

## Provider Plugins

- [@seneca/hubspot-provider](https://github.com/senecajs/seneca-hubspot-provider) - Seneca plugin that provides access to the HubSpot API.
- [@seneca/eventbrite-provider](https://github.com/senecajs/seneca-eventbrite-provider) - Seneca provider for the eventbrite.com API.
- [@seneca/gcal-provider](https://github.com/senecajs/seneca-gcal-provider) - Seneca plugin that provides access to the Google Calendar API.
- [@seneca/github-provider](https://github.com/senecajs/seneca-github-provider) - Seneca plugin that provides access to the GitHub API.
- [@seneca/gitlab-provider](https://github.com/senecajs/seneca-gitlab-provider) - Seneca plugin that provides access to the GitLab API.
- [@seneca/nordigen-provider](https://github.com/senecajs/seneca-nordigen-provider) - Seneca provider for the nordigen API
- [@seneca/notion-provider](https://github.com/senecajs/seneca-notion-provider) - Seneca plugin that provides access to the Notion.so API.
- [@seneca/salesforce-provider](https://github.com/senecajs/seneca-salesforce-provider) - Seneca plugin that provides access to the SalesForce API.
- [@seneca/stytch-provider](https://github.com/senecajs/seneca-stytch-provider) - Seneca plugin that provides access to the Stytch API.
- [@seneca/trello-provider](https://github.com/senecajs/seneca-trello-provider) - Seneca plugin that provides access to the Trello API.

# Write Your Own Provider

- [seneca-example-provider](https://github.com/senecajs/seneca-example-provider) - Example Provider Plugin starting point

<!--START:options-->

### Options

- `provider` : object <i><small>[object Object]</small></i>

Set plugin options when loading with:

```js


seneca.use('provider', { name: value, ... })


```

<small>Note: <code>foo.bar</code> in the list above means
<code>{ foo: { bar: ... } }</code></small>

<!--END:options-->

<!--START:action-list-->

### Action Patterns

<<<<<<< HEAD

- [sys:provider,get:key](#-sysprovidergetkey-)
- # [sys:provider,list:provider](#-sysproviderlistprovider-)

## Action Patterns

- [get:key,sys:provider](#-getkeysysprovider-)
- [get:keymap,sys:provider](#-getkeymapsysprovider-)
- [list:provider,sys:provider](#-listprovidersysprovider-)

> > > > > > > b8d195a7b56cac3e9d66fa023aba7a91ff0e0a4a

<!--END:action-list-->

<!--START:action-desc-->

### Action Descriptions

<<<<<<< HEAD

#### &laquo; `sys:provider,get:key` &raquo;

=======

## Action Descriptions

### &laquo; `get:key,sys:provider` &raquo;

> > > > > > > b8d195a7b56cac3e9d66fa023aba7a91ff0e0a4a

Get the value for a specific provider and key name.

---

<<<<<<< HEAD

#### &laquo; `sys:provider,list:provider` &raquo;

=======

---

### &laquo; `get:keymap,sys:provider` &raquo;

No description provided.

---

### &laquo; `list:provider,sys:provider` &raquo;

> > > > > > > b8d195a7b56cac3e9d66fa023aba7a91ff0e0a4a

List all the providers and their key names.

---

<!--END:action-desc-->

## More Examples

## Motivation

## Support

## API

## Contributing

## Background
