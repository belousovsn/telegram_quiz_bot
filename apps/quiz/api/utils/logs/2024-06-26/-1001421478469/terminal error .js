          buffer: [],
          bufferIndex: 0,
          length: 0,
          pipes: [],
          awaitDrainWriters: null,
          [Symbol(kState)]: 60303620
        },
        _writableState: WritableState {
          highWaterMark: 16384,
          length: 0,
          corked: 0,
          onwrite: [Function: bound onwrite],
          writelen: 0,
          bufferedIndex: 0,
          pendingcb: 0,
          [Symbol(kState)]: 17563908,
          [Symbol(kBufferedValue)]: null,
          [Symbol(kWriteCbValue)]: [Function (anonymous)]
        },
        allowHalfOpen: false,
        _maxListeners: undefined,
        _sockname: null,
        _pendingData: null,
        _pendingEncoding: '',
        server: undefined,
        _server: null,
        ssl: <ref *2> TLSWrap {
          _parent: TCP {
            reading: [Getter/Setter],
            onconnection: null,
            [Symbol(owner_symbol)]: [Circular *1]
          },
          _parentWrap: null,
          _secureContext: SecureContext { context: SecureContext {} },
          reading: true,
          onkeylog: [Function: onkeylog],
          onhandshakestart: {},
          onhandshakedone: [Function (anonymous)],
          onocspresponse: [Function: onocspresponse],
          onnewsession: [Function: onnewsessionclient],
          onerror: [Function: onerror],
          [Symbol(owner_symbol)]: [Circular *1],
          [Symbol(resource_symbol)]: ReusedHandle { type: 57, handle: [Circular *2] }
        },
        _requestCert: true,
        _rejectUnauthorized: true,
        parser: null,
        _httpMessage: null,
        timeout: 0,
        [Symbol(alpncallback)]: null,
        [Symbol(res)]: <ref *2> TLSWrap {
          _parent: TCP {
            reading: [Getter/Setter],
            onconnection: null,
            [Symbol(owner_symbol)]: [Circular *1]
          },
          _parentWrap: null,
          _secureContext: SecureContext { context: SecureContext {} },
          reading: true,
          onkeylog: [Function: onkeylog],
          onhandshakestart: {},
          onhandshakedone: [Function (anonymous)],
          onocspresponse: [Function: onocspresponse],
          onnewsession: [Function: onnewsessionclient],
          onerror: [Function: onerror],
          [Symbol(owner_symbol)]: [Circular *1],
          [Symbol(resource_symbol)]: ReusedHandle { type: 57, handle: [Circular *2] }
        },
        [Symbol(verified)]: true,
        [Symbol(pendingSession)]: null,
        [Symbol(async_id_symbol)]: -1,
        [Symbol(kHandle)]: <ref *2> TLSWrap {
          _parent: TCP {
            reading: [Getter/Setter],
            onconnection: null,
            [Symbol(owner_symbol)]: [Circular *1]
          },
          _parentWrap: null,
          _secureContext: SecureContext { context: SecureContext {} },
          reading: true,
          onkeylog: [Function: onkeylog],
          onhandshakestart: {},
          onhandshakedone: [Function (anonymous)],
          onocspresponse: [Function: onocspresponse],
          onnewsession: [Function: onnewsessionclient],
          onerror: [Function: onerror],
          [Symbol(owner_symbol)]: [Circular *1],
          [Symbol(resource_symbol)]: ReusedHandle { type: 57, handle: [Circular *2] }
        },
        [Symbol(lastWriteQueueSize)]: 0,
        [Symbol(timeout)]: null,
        [Symbol(kBuffer)]: null,
        [Symbol(kBufferCb)]: null,
        [Symbol(kBufferGen)]: null,
        [Symbol(shapeMode)]: true,
        [Symbol(kCapture)]: false,
        [Symbol(kSetNoDelay)]: false,
        [Symbol(kSetKeepAlive)]: true,
        [Symbol(kSetKeepAliveInitialDelay)]: 1,
        [Symbol(kBytesRead)]: 0,
        [Symbol(kBytesWritten)]: 0,
        [Symbol(connect-options)]: {
          rejectUnauthorized: true,
          ciphers: 'TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256:TLS_AES_128_GCM_SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA256:ECDHE-RSA-AES256-SHA384:DHE-RSA-AES256-SHA384:ECDHE-RSA-AES256-SHA256:DHE-RSA-AES256-SHA256:HIGH:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!MD5:!PSK:!SRP:!CAMELLIA',
          checkServerIdentity: [Function: checkServerIdentity],
          minDHSize: 1024,
          session: Buffer(2103) [Uint8Array] [
             48, 130,   8,  51,   2,   1,   1,   2,   2,   3,   4,   4,
              2,  19,   2,   4,  32, 185, 241,  86,  18, 232, 147,  21,
            237, 255, 155, 207, 237, 204, 151,  99,  27,  51, 105,  65,
             23, 117,   5, 255, 226, 151, 184, 111,  24,  12, 115, 109,
            129,   4,  48,   4, 235, 247,  82, 167, 244, 165, 115,  68,
            251, 244, 119,   6,   6, 115, 186, 160, 168,  40, 157, 203,
             61, 185,  95, 119,  75,  56, 197, 163, 203,  29, 200, 207,
             47,  80, 215, 233, 212,  95, 162,  30, 183, 204, 190, 137,
            160,  73, 222, 161,
            ... 2003 more items
          ],
          _events: [Object: null prototype] {
            error: [Function: bound ],
            complete: [Function: bound ],
            pipe: [Function (anonymous)],
            data: [Function (anonymous)],
            end: [Function (anonymous)]
          },
          _eventsCount: 3,
          _maxListeners: undefined,
          method: 'POST',
          simple: false,
          resolveWithFullResponse: true,
          forever: true,
          readable: true,
          writable: true,
          explicitMethod: true,
          _qs: <ref *3> Querystring {
            request: [Request],
            lib: [Object],
            useQuerystring: undefined,
            parseOptions: {},
            stringifyOptions: {}
          },
          _auth: <ref *4> Auth {
            request: [Request],
            hasAuth: false,
            sentAuth: false,
            bearerToken: null,
            user: null,
            pass: null
          },
          _multipart: <ref *5> Multipart {
            request: [Request],
            boundary: 'd97678ef-8509-4913-84a4-31278711088f',
            chunked: false,
            body: null
          },
          _redirect: <ref *6> Redirect {
            request: [Request],
            followRedirect: true,
            followRedirects: true,
            followAllRedirects: false,
            followOriginalHttpMethod: false,
            allowRedirect: [Function (anonymous)],
            maxRedirects: 10,
            redirects: [],
            redirectsFollowed: 0,
            removeRefererHeader: false,
            allowInsecureRedirect: false
          },
          _tunnel: <ref *7> Tunnel {
            request: [Request],
            proxyHeaderWhiteList: [Array],
            proxyHeaderExclusiveList: []
          },
          _rp_resolve: [Function (anonymous)],
          _rp_reject: [Function (anonymous)],
          _rp_promise: Promise [Object] {
            _bitField: 33554432,
            _fulfillmentHandler0: [Function (anonymous)],
            _rejectionHandler0: [IncomingMessage],
            _promise0: undefined,
            _receiver0: undefined,
            _onCancelField: undefined,
            _branchesRemainingToCancel: 1,
            _cancellationParent: undefined
          },
          _rp_callbackOrig: undefined,
          callback: [Function (anonymous)],
          _rp_options: {
            form: [Object],
            method: 'POST',
            url: 'https://api.telegram.org/bot7382983814:AAFbhkqtEMIeg_HjsczjHjA9OUYa-eU_rKU/editMessageText',
            simple: false,
            resolveWithFullResponse: true,
            forever: true,
            callback: [Function: RP$callback],
            transform: undefined,
            transform2xxOnly: false
          },
          headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'content-length': 526
          },
          setHeader: [Function (anonymous)],
          hasHeader: [Function (anonymous)],
          getHeader: [Function (anonymous)],
          removeHeader: [Function (anonymous)],
          localAddress: undefined,
          pool: { 'https:': [Agent] },
          dests: [],
          __isRequestRequest: true,
          _callback: [Function: RP$callback],
          uri: Url {
            protocol: 'https:',
            slashes: true,
            auth: null,
            host: 'api.telegram.org',
            port: 443,
            hostname: 'api.telegram.org',
            hash: null,
            search: null,
            query: null,
            pathname: '/bot7382983814:AAFbhkqtEMIeg_HjsczjHjA9OUYa-eU_rKU/editMessageText',
            path: '/bot7382983814:AAFbhkqtEMIeg_HjsczjHjA9OUYa-eU_rKU/editMessageText',
            href: 'https://api.telegram.org/bot7382983814:AAFbhkqtEMIeg_HjsczjHjA9OUYa-eU_rKU/editMessageText'
          },
          proxy: null,
          tunnel: true,
          setHost: true,
          originalCookieHeader: undefined,
          _disableCookies: true,
          _jar: undefined,
          port: 443,
          host: 'api.telegram.org',
          body: 'chat_id=5757013475&message_id=1030&reply_markup=%7B%22inline_keyboard%22%3A%5B%5B%7B%22text%22%3A%22Thomas%20Jefferson%22%2C%22callback_data%22%3A%220%22%7D%2C%7B%22text%22%3A%22Abraham%20Lincoln%22%2C%22callback_data%22%3A%221%22%7D%5D%2C%5B%7B%22text%22%3A%22George%20Washington%22%2C%22callback_data%22%3A%222%22%7D%2C%7B%22text%22%3A%22John%20Adams%22%2C%22callback_data%22%3A%223%22%7D%5D%5D%7D&text=Who%20was%20the%20first%20President%20of%20the%20United%20States%3F%0A%0A%F0%9F%92%A3%20Time%20remaining%3A%202%20seconds',
          path: null,
          httpModule: {
            Agent: [Function: Agent],
            globalAgent: [Agent],
            Server: [Function: Server],
            createServer: [Function: createServer],
            get: [Function: get],
            request: [Function: request]
          },
          agentClass: [Function: Agent],
          agentOptions: { keepAlive: true },
          agent: Agent {
            _events: [Object: null prototype],
            _eventsCount: 2,
            _maxListeners: undefined,
            defaultPort: 443,
            protocol: 'https:',
            options: [Object: null prototype],
            requests: [Object: null prototype] {},
            sockets: [Object: null prototype],
            freeSockets: [Object: null prototype],
            keepAliveMsecs: 1000,
            keepAlive: true,
            maxSockets: Infinity,
            maxFreeSockets: 256,
            scheduling: 'lifo',
            maxTotalSockets: Infinity,
            totalSocketCount: 7,
            maxCachedSessions: 100,
            _sessionCache: [Object],
            [Symbol(shapeMode)]: false,
            [Symbol(kCapture)]: false
          },
          _started: true,
          href: 'https://api.telegram.org/bot7382983814:AAFbhkqtEMIeg_HjsczjHjA9OUYa-eU_rKU/editMessageText',
          _defaultAgent: Agent {
            _events: [Object: null prototype],
            _eventsCount: 2,
            _maxListeners: undefined,
            defaultPort: 443,
            protocol: 'https:',
            options: [Object: null prototype],
            requests: [Object: null prototype] {},
            sockets: [Object: null prototype] {},
            freeSockets: [Object: null prototype] {},
            keepAliveMsecs: 1000,
            keepAlive: true,
            maxSockets: Infinity,
            maxFreeSockets: 256,
            scheduling: 'lifo',
            maxTotalSockets: Infinity,
            totalSocketCount: 0,
            maxCachedSessions: 100,
            _sessionCache: [Object],
            [Symbol(shapeMode)]: false,
            [Symbol(kCapture)]: false
          },
          keepAlive: true,
          noDelay: true,
          servername: 'api.telegram.org',
          _agentKey: 'api.telegram.org:443:::::::::::::::::::::',
          encoding: null,
          keepAliveInitialDelay: 1000
        }
      },
      _header: 'POST /bot7382983814:AAFbhkqtEMIeg_HjsczjHjA9OUYa-eU_rKU/sendMessage HTTP/1.1\r\n' +
        'host: api.telegram.org\r\n' +
        'content-type: application/x-www-form-urlencoded\r\n' +
        'content-length: 78\r\n' +
        'Connection: keep-alive\r\n' +
        '\r\n',
      _keepAliveTimeout: 0,
      _onPendingData: [Function: nop],
      agent: Agent {
        _events: [Object: null prototype] {
          free: [Function (anonymous)],
          newListener: [Function: maybeEnableKeylog]
        },
        _eventsCount: 2,
        _maxListeners: undefined,
        defaultPort: 443,
        protocol: 'https:',
        options: [Object: null prototype] {
          keepAlive: true,
          noDelay: true,
          path: null
        },
        requests: [Object: null prototype] {},
        sockets: [Object: null prototype] {
          'api.telegram.org:443:::::::::::::::::::::': [ [TLSSocket] ]
        },
        freeSockets: [Object: null prototype] {
          'api.telegram.org:443:::::::::::::::::::::': [
            [TLSSocket],
            [TLSSocket],
            [TLSSocket],
            [TLSSocket],
            [TLSSocket],
            [TLSSocket]
          ]
        },
        keepAliveMsecs: 1000,
        keepAlive: true,
        maxSockets: Infinity,
        maxFreeSockets: 256,
        scheduling: 'lifo',
        maxTotalSockets: Infinity,
        totalSocketCount: 7,
        maxCachedSessions: 100,
        _sessionCache: {
          map: {
            'api.telegram.org:443:::::::::::::::::::::': [Buffer [Uint8Array]]
          },
          list: [ 'api.telegram.org:443:::::::::::::::::::::' ]
        },
        [Symbol(shapeMode)]: false,
        [Symbol(kCapture)]: false
      },
      socketPath: undefined,
      method: 'POST',
      maxHeaderSize: undefined,
      insecureHTTPParser: undefined,
      joinDuplicateHeaders: undefined,
      path: '/bot7382983814:AAFbhkqtEMIeg_HjsczjHjA9OUYa-eU_rKU/sendMessage',
      _ended: true,
      res: [Circular *8],
      aborted: false,
      timeoutCb: null,
      upgradeOrConnect: false,
      parser: null,
      maxHeadersCount: null,
      reusedSocket: true,
      host: 'api.telegram.org',
      protocol: 'https:',
      [Symbol(shapeMode)]: false,
      [Symbol(kCapture)]: false,
      [Symbol(kBytesWritten)]: 0,
      [Symbol(kNeedDrain)]: false,
      [Symbol(corked)]: 0,
      [Symbol(kOutHeaders)]: [Object: null prototype] {
        host: [ 'host', 'api.telegram.org' ],
        'content-type': [ 'content-type', 'application/x-www-form-urlencoded' ],
        'content-length': [ 'content-length', 78 ]
      },
      [Symbol(errored)]: null,
      [Symbol(kHighWaterMark)]: 16384,
      [Symbol(kRejectNonStandardBodyWrites)]: false,
      [Symbol(kUniqueHeaders)]: null
    },
    _eventsCount: 4,
    request: <ref *9> Request {
      _events: [Object: null prototype] {
        error: [Function: bound ],
        complete: [Function: bound ],
        pipe: [Function (anonymous)],
        data: [Function (anonymous)],
        end: [Function (anonymous)]
      },
      _eventsCount: 5,
      _maxListeners: undefined,
      method: 'POST',
      simple: false,
      resolveWithFullResponse: true,
      forever: true,
      readable: true,
      writable: true,
      explicitMethod: true,
      _qs: Querystring {
        request: [Circular *9],
        lib: {
          formats: {
            default: 'RFC3986',
            formatters: [Object],
            RFC1738: 'RFC1738',
            RFC3986: 'RFC3986'
          },
          parse: [Function (anonymous)],
          stringify: [Function (anonymous)]
        },
        useQuerystring: undefined,
        parseOptions: {},
        stringifyOptions: {}
      },
      _auth: Auth {
        request: [Circular *9],
        hasAuth: false,
        sentAuth: false,
        bearerToken: null,
        user: null,
        pass: null
      },
      _multipart: Multipart {
        request: [Circular *9],
        boundary: '158e3f68-2860-42fe-b081-fbdc0657e93a',
        chunked: false,
        body: null
      },
      _redirect: Redirect {
        request: [Circular *9],
        followRedirect: true,
        followRedirects: true,
        followAllRedirects: false,
        followOriginalHttpMethod: false,
        allowRedirect: [Function (anonymous)],
        maxRedirects: 10,
        redirects: [],
        redirectsFollowed: 0,
        removeRefererHeader: false,
        allowInsecureRedirect: false
      },
      _tunnel: Tunnel {
        request: [Circular *9],
        proxyHeaderWhiteList: [
          'accept',           'accept-charset',
          'accept-encoding',  'accept-language',
          'accept-ranges',    'cache-control',
          'content-encoding', 'content-language',
          'content-location', 'content-md5',
          'content-range',    'content-type',
          'connection',       'date',
          'expect',           'max-forwards',
          'pragma',           'referer',
          'te',               'user-agent',
          'via'
        ],
        proxyHeaderExclusiveList: []
      },
      _rp_resolve: [Function (anonymous)],
      _rp_reject: [Function (anonymous)],
      _rp_promise: Promise [Object] {
        _bitField: 33554432,
        _fulfillmentHandler0: [Function (anonymous)],
        _rejectionHandler0: [Circular *8],
        _promise0: undefined,
        _receiver0: undefined,
        _onCancelField: undefined,
        _branchesRemainingToCancel: 1,
        _cancellationParent: undefined
      },
      _rp_callbackOrig: undefined,
      callback: [Function (anonymous)],
      _rp_options: {
        form: {
          chat_id: -1001421478469,
          text: 'The correct answer is: Albert Einstein'
        },
        method: 'POST',
        url: 'https://api.telegram.org/bot7382983814:AAFbhkqtEMIeg_HjsczjHjA9OUYa-eU_rKU/sendMessage',
        simple: false,
        resolveWithFullResponse: true,
        forever: true,
        callback: [Function: RP$callback],
        transform: undefined,
        transform2xxOnly: false
      },
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'content-length': 78
      },
      setHeader: [Function (anonymous)],
      hasHeader: [Function (anonymous)],
      getHeader: [Function (anonymous)],
      removeHeader: [Function (anonymous)],
      localAddress: undefined,
      pool: {
        'https:': Agent {
          _events: [Object: null prototype] {
            free: [Function (anonymous)],
            newListener: [Function: maybeEnableKeylog]
          },
          _eventsCount: 2,
          _maxListeners: undefined,
          defaultPort: 443,
          protocol: 'https:',
          options: [Object: null prototype] {
            keepAlive: true,
            noDelay: true,
            path: null
          },
          requests: [Object: null prototype] {},
          sockets: [Object: null prototype] {
            'api.telegram.org:443:::::::::::::::::::::': [Array]
          },
          freeSockets: [Object: null prototype] {
            'api.telegram.org:443:::::::::::::::::::::': [Array]
          },
          keepAliveMsecs: 1000,
          keepAlive: true,
          maxSockets: Infinity,
          maxFreeSockets: 256,
          scheduling: 'lifo',
          maxTotalSockets: Infinity,
          totalSocketCount: 7,
          maxCachedSessions: 100,
          _sessionCache: { map: [Object], list: [Array] },
          [Symbol(shapeMode)]: false,
          [Symbol(kCapture)]: false
        }
      },
      dests: [],
      __isRequestRequest: true,
      _callback: [Function: RP$callback],
      uri: Url {
        protocol: 'https:',
        slashes: true,
        auth: null,
        host: 'api.telegram.org',
        port: 443,
        hostname: 'api.telegram.org',
        hash: null,
        search: null,
        query: null,
        pathname: '/bot7382983814:AAFbhkqtEMIeg_HjsczjHjA9OUYa-eU_rKU/sendMessage',
        path: '/bot7382983814:AAFbhkqtEMIeg_HjsczjHjA9OUYa-eU_rKU/sendMessage',
        href: 'https://api.telegram.org/bot7382983814:AAFbhkqtEMIeg_HjsczjHjA9OUYa-eU_rKU/sendMessage'
      },
      proxy: null,
      tunnel: true,
      setHost: true,
      originalCookieHeader: undefined,
      _disableCookies: true,
      _jar: undefined,
      port: 443,
      host: 'api.telegram.org',
      body: 'chat_id=-1001421478469&text=The%20correct%20answer%20is%3A%20Albert%20Einstein',
      path: '/bot7382983814:AAFbhkqtEMIeg_HjsczjHjA9OUYa-eU_rKU/sendMessage',
      httpModule: {
        Agent: [Function: Agent],
        globalAgent: Agent {
          _events: [Object: null prototype] {
            free: [Function (anonymous)],
            newListener: [Function: maybeEnableKeylog]
          },
          _eventsCount: 2,
          _maxListeners: undefined,
          defaultPort: 443,
          protocol: 'https:',
          options: [Object: null prototype] {
            keepAlive: true,
            scheduling: 'lifo',
            timeout: 5000,
            noDelay: true,
            path: null
          },
          requests: [Object: null prototype] {},
          sockets: [Object: null prototype] {},
          freeSockets: [Object: null prototype] {},
          keepAliveMsecs: 1000,
          keepAlive: true,
          maxSockets: Infinity,
          maxFreeSockets: 256,
          scheduling: 'lifo',
          maxTotalSockets: Infinity,
          totalSocketCount: 0,
          maxCachedSessions: 100,
          _sessionCache: { map: {}, list: [] },
          [Symbol(shapeMode)]: false,
          [Symbol(kCapture)]: false
        },
        Server: [Function: Server],
        createServer: [Function: createServer],
        get: [Function: get],
        request: [Function: request]
      },
      agentClass: [Function: Agent],
      agentOptions: { keepAlive: true },
      agent: Agent {
        _events: [Object: null prototype] {
          free: [Function (anonymous)],
          newListener: [Function: maybeEnableKeylog]
        },
        _eventsCount: 2,
        _maxListeners: undefined,
        defaultPort: 443,
        protocol: 'https:',
        options: [Object: null prototype] {
          keepAlive: true,
          noDelay: true,
          path: null
        },
        requests: [Object: null prototype] {},
        sockets: [Object: null prototype] {
          'api.telegram.org:443:::::::::::::::::::::': [ [TLSSocket] ]
        },
        freeSockets: [Object: null prototype] {
          'api.telegram.org:443:::::::::::::::::::::': [
            [TLSSocket],
            [TLSSocket],
            [TLSSocket],
            [TLSSocket],
            [TLSSocket],
            [TLSSocket]
          ]
        },
        keepAliveMsecs: 1000,
        keepAlive: true,
        maxSockets: Infinity,
        maxFreeSockets: 256,
        scheduling: 'lifo',
        maxTotalSockets: Infinity,
        totalSocketCount: 7,
        maxCachedSessions: 100,
        _sessionCache: {
          map: {
            'api.telegram.org:443:::::::::::::::::::::': [Buffer [Uint8Array]]
          },
          list: [ 'api.telegram.org:443:::::::::::::::::::::' ]
        },
        [Symbol(shapeMode)]: false,
        [Symbol(kCapture)]: false
      },
      _started: true,
      href: 'https://api.telegram.org/bot7382983814:AAFbhkqtEMIeg_HjsczjHjA9OUYa-eU_rKU/sendMessage',
      req: ClientRequest {
        _events: [Object: null prototype] {
          response: [Function: bound ],
          error: [Function: bound ],
          drain: [Function (anonymous)],
          socket: [Function (anonymous)],
          finish: [Function: requestOnFinish]
        },
        _eventsCount: 5,
        _maxListeners: undefined,
        outputData: [],
        outputSize: 0,
        writable: true,
        destroyed: true,
        _last: false,
        chunkedEncoding: false,
        shouldKeepAlive: true,
        maxRequestsOnConnectionReached: false,
        _defaultKeepAlive: true,
        useChunkedEncodingByDefault: true,
        sendDate: false,
        _removedConnection: false,
        _removedContLen: false,
        _removedTE: false,
        strictContentLength: false,
        _contentLength: 78,
        _hasBody: true,
        _trailer: '',
        finished: true,
        _headerSent: true,
        _closed: true,
        socket: <ref *1> TLSSocket {
          _tlsOptions: {
            allowHalfOpen: undefined,
            pipe: false,
            secureContext: [SecureContext],
            isServer: false,
            requestCert: true,
            rejectUnauthorized: true,
            session: [Buffer [Uint8Array]],
            ALPNProtocols: undefined,
            requestOCSP: undefined,
            enableTrace: undefined,
            pskCallback: undefined,
            highWaterMark: undefined,
            onread: undefined,
            signal: undefined
          },
          _secureEstablished: true,
          _securePending: false,
          _newSessionPending: false,
          _controlReleased: true,
          secureConnecting: false,
          _SNICallback: null,
          servername: 'api.telegram.org',
          alpnProtocol: false,
          authorized: true,
          authorizationError: null,
          encrypted: true,
          _events: [Object: null prototype] {
            close: [Array],
            end: [Function: onReadableStreamEnd],
            error: [Function],
            newListener: [Function: keylogNewListener],
            connect: undefined,
            secure: [Function: onConnectSecure],
            session: [Function (anonymous)],
            free: [Function: onFree],
            timeout: [Function: onTimeout],
            agentRemove: [Function: onRemove],
            data: undefined,
            drain: undefined
          },
          _eventsCount: 9,
          connecting: false,
          _hadError: false,
          _parent: null,
          _host: 'api.telegram.org',
          _closeAfterHandlingError: false,
          _readableState: ReadableState {
            highWaterMark: 16384,
            buffer: [],
            bufferIndex: 0,
            length: 0,
            pipes: [],
            awaitDrainWriters: null,
            [Symbol(kState)]: 60303620
          },
          _writableState: WritableState {
            highWaterMark: 16384,
            length: 0,
            corked: 0,
            onwrite: [Function: bound onwrite],
            writelen: 0,
            bufferedIndex: 0,
            pendingcb: 0,
            [Symbol(kState)]: 17563908,
            [Symbol(kBufferedValue)]: null,
            [Symbol(kWriteCbValue)]: [Function (anonymous)]
          },
          allowHalfOpen: false,
          _maxListeners: undefined,
          _sockname: null,
          _pendingData: null,
          _pendingEncoding: '',
          server: undefined,
          _server: null,
          ssl: <ref *2> TLSWrap {
            _parent: [TCP],
            _parentWrap: null,
            _secureContext: [SecureContext],
            reading: true,
            onkeylog: [Function: onkeylog],
            onhandshakestart: {},
            onhandshakedone: [Function (anonymous)],
            onocspresponse: [Function: onocspresponse],
            onnewsession: [Function: onnewsessionclient],
            onerror: [Function: onerror],
            [Symbol(owner_symbol)]: [Circular *1],
            [Symbol(resource_symbol)]: [ReusedHandle]
          },
          _requestCert: true,
          _rejectUnauthorized: true,
          parser: null,
          _httpMessage: null,
          timeout: 0,
          [Symbol(alpncallback)]: null,
          [Symbol(res)]: <ref *2> TLSWrap {
            _parent: [TCP],
            _parentWrap: null,
            _secureContext: [SecureContext],
            reading: true,
            onkeylog: [Function: onkeylog],
            onhandshakestart: {},
            onhandshakedone: [Function (anonymous)],
            onocspresponse: [Function: onocspresponse],
            onnewsession: [Function: onnewsessionclient],
            onerror: [Function: onerror],
            [Symbol(owner_symbol)]: [Circular *1],
            [Symbol(resource_symbol)]: [ReusedHandle]
          },
          [Symbol(verified)]: true,
          [Symbol(pendingSession)]: null,
          [Symbol(async_id_symbol)]: -1,
          [Symbol(kHandle)]: <ref *2> TLSWrap {
            _parent: [TCP],
            _parentWrap: null,
            _secureContext: [SecureContext],
            reading: true,
            onkeylog: [Function: onkeylog],
            onhandshakestart: {},
            onhandshakedone: [Function (anonymous)],
            onocspresponse: [Function: onocspresponse],
            onnewsession: [Function: onnewsessionclient],
            onerror: [Function: onerror],
            [Symbol(owner_symbol)]: [Circular *1],
            [Symbol(resource_symbol)]: [ReusedHandle]
          },
          [Symbol(lastWriteQueueSize)]: 0,
          [Symbol(timeout)]: null,
          [Symbol(kBuffer)]: null,
          [Symbol(kBufferCb)]: null,
          [Symbol(kBufferGen)]: null,
          [Symbol(shapeMode)]: true,
          [Symbol(kCapture)]: false,
          [Symbol(kSetNoDelay)]: false,
          [Symbol(kSetKeepAlive)]: true,
          [Symbol(kSetKeepAliveInitialDelay)]: 1,
          [Symbol(kBytesRead)]: 0,
          [Symbol(kBytesWritten)]: 0,
          [Symbol(connect-options)]: {
            rejectUnauthorized: true,
            ciphers: 'TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256:TLS_AES_128_GCM_SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA256:ECDHE-RSA-AES256-SHA384:DHE-RSA-AES256-SHA384:ECDHE-RSA-AES256-SHA256:DHE-RSA-AES256-SHA256:HIGH:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!MD5:!PSK:!SRP:!CAMELLIA',
            checkServerIdentity: [Function: checkServerIdentity],
            minDHSize: 1024,
            session: [Buffer [Uint8Array]],
            _events: [Object: null prototype],
            _eventsCount: 3,
            _maxListeners: undefined,
            method: 'POST',
            simple: false,
            resolveWithFullResponse: true,
            forever: true,
            readable: true,
            writable: true,
            explicitMethod: true,
            _qs: [Querystring],
            _auth: [Auth],
            _multipart: [Multipart],
            _redirect: [Redirect],
            _tunnel: [Tunnel],
            _rp_resolve: [Function (anonymous)],
            _rp_reject: [Function (anonymous)],
            _rp_promise: [Promise [Object]],
            _rp_callbackOrig: undefined,
            callback: [Function (anonymous)],
            _rp_options: [Object],
            headers: [Object],
            setHeader: [Function (anonymous)],
            hasHeader: [Function (anonymous)],
            getHeader: [Function (anonymous)],
            removeHeader: [Function (anonymous)],
            localAddress: undefined,
            pool: [Object],
            dests: [],
            __isRequestRequest: true,
            _callback: [Function: RP$callback],
            uri: [Url],
            proxy: null,
            tunnel: true,
            setHost: true,
            originalCookieHeader: undefined,
            _disableCookies: true,
            _jar: undefined,
            port: 443,
            host: 'api.telegram.org',
            body: 'chat_id=5757013475&message_id=1030&reply_markup=%7B%22inline_keyboard%22%3A%5B%5B%7B%22text%22%3A%22Thomas%20Jefferson%22%2C%22callback_data%22%3A%220%22%7D%2C%7B%22text%22%3A%22Abraham%20Lincoln%22%2C%22callback_data%22%3A%221%22%7D%5D%2C%5B%7B%22text%22%3A%22George%20Washington%22%2C%22callback_data%22%3A%222%22%7D%2C%7B%22text%22%3A%22John%20Adams%22%2C%22callback_data%22%3A%223%22%7D%5D%5D%7D&text=Who%20was%20the%20first%20President%20of%20the%20United%20States%3F%0A%0A%F0%9F%92%A3%20Time%20remaining%3A%202%20seconds',
            path: null,
            httpModule: [Object],
            agentClass: [Function: Agent],
            agentOptions: [Object],
            agent: [Agent],
            _started: true,
            href: 'https://api.telegram.org/bot7382983814:AAFbhkqtEMIeg_HjsczjHjA9OUYa-eU_rKU/editMessageText',
            _defaultAgent: [Agent],
            keepAlive: true,
            noDelay: true,
            servername: 'api.telegram.org',
            _agentKey: 'api.telegram.org:443:::::::::::::::::::::',
            encoding: null,
            keepAliveInitialDelay: 1000
          }
        },
        _header: 'POST /bot7382983814:AAFbhkqtEMIeg_HjsczjHjA9OUYa-eU_rKU/sendMessage HTTP/1.1\r\n' +
          'host: api.telegram.org\r\n' +
          'content-type: application/x-www-form-urlencoded\r\n' +
          'content-length: 78\r\n' +
          'Connection: keep-alive\r\n' +
          '\r\n',
        _keepAliveTimeout: 0,
        _onPendingData: [Function: nop],
        agent: Agent {
          _events: [Object: null prototype] {
            free: [Function (anonymous)],
            newListener: [Function: maybeEnableKeylog]
          },
          _eventsCount: 2,
          _maxListeners: undefined,
          defaultPort: 443,
          protocol: 'https:',
          options: [Object: null prototype] {
            keepAlive: true,
            noDelay: true,
            path: null
          },
          requests: [Object: null prototype] {},
          sockets: [Object: null prototype] {
            'api.telegram.org:443:::::::::::::::::::::': [Array]
          },
          freeSockets: [Object: null prototype] {
            'api.telegram.org:443:::::::::::::::::::::': [Array]
          },
          keepAliveMsecs: 1000,
          keepAlive: true,
          maxSockets: Infinity,
          maxFreeSockets: 256,
          scheduling: 'lifo',
          maxTotalSockets: Infinity,
          totalSocketCount: 7,
          maxCachedSessions: 100,
          _sessionCache: { map: [Object], list: [Array] },
          [Symbol(shapeMode)]: false,
          [Symbol(kCapture)]: false
        },
        socketPath: undefined,
        method: 'POST',
        maxHeaderSize: undefined,
        insecureHTTPParser: undefined,
        joinDuplicateHeaders: undefined,
        path: '/bot7382983814:AAFbhkqtEMIeg_HjsczjHjA9OUYa-eU_rKU/sendMessage',
        _ended: true,
        res: [Circular *8],
        aborted: false,
        timeoutCb: null,
        upgradeOrConnect: false,
        parser: null,
        maxHeadersCount: null,
        reusedSocket: true,
        host: 'api.telegram.org',
        protocol: 'https:',
        [Symbol(shapeMode)]: false,
        [Symbol(kCapture)]: false,
        [Symbol(kBytesWritten)]: 0,
        [Symbol(kNeedDrain)]: false,
        [Symbol(corked)]: 0,
        [Symbol(kOutHeaders)]: [Object: null prototype] {
          host: [ 'host', 'api.telegram.org' ],
          'content-type': [ 'content-type', 'application/x-www-form-urlencoded' ],
          'content-length': [ 'content-length', 78 ]
        },
        [Symbol(errored)]: null,
        [Symbol(kHighWaterMark)]: 16384,
        [Symbol(kRejectNonStandardBodyWrites)]: false,
        [Symbol(kUniqueHeaders)]: null
      },
      ntick: true,
      response: [Circular *8],
      originalHost: 'api.telegram.org',
      originalHostHeaderName: 'host',
      responseContent: [Circular *8],
      _destdata: true,
      _ended: true,
      _callbackCalled: true,
      [Symbol(shapeMode)]: false,
      [Symbol(kCapture)]: false
    },
    toJSON: [Function: responseToJSON],
    caseless: Caseless {
      dict: {
        server: 'nginx/1.18.0',
        date: 'Wed, 26 Jun 2024 21:38:53 GMT',
        'content-type': 'application/json',
        'content-length': '111',
        connection: 'keep-alive',
        'retry-after': '22',
        'strict-transport-security': 'max-age=31536000; includeSubDomains; preload',
        'access-control-allow-origin': '*',
        'access-control-expose-headers': 'Content-Length,Content-Type,Date,Server,Connection'
      }
    },
    body: {
      ok: false,
      error_code: 429,
      description: 'Too Many Requests: retry after 22',
      parameters: { retry_after: 22 }
    },
    [Symbol(shapeMode)]: true,
    [Symbol(kCapture)]: false,
    [Symbol(kHeaders)]: {
      server: 'nginx/1.18.0',
      date: 'Wed, 26 Jun 2024 21:38:53 GMT',
      'content-type': 'application/json',
      'content-length': '111',
      connection: 'keep-alive',
      'retry-after': '22',
      'strict-transport-security': 'max-age=31536000; includeSubDomains; preload',
      'access-control-allow-origin': '*',
      'access-control-expose-headers': 'Content-Length,Content-Type,Date,Server,Connection'
    },
    [Symbol(kHeadersCount)]: 18,
    [Symbol(kTrailers)]: null,
    [Symbol(kTrailersCount)]: 0
  }
}