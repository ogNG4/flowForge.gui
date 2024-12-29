# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

-   [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
-   [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

-   Configure the top-level `parserOptions` property like this:

```js
export default {
    // other rules...
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['./tsconfig.json', './tsconfig.node.json'],
        tsconfigRootDir: __dirname,
    },
};
```

-   Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
-   Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
-   Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

```
flow-forge.gui
├─ .eslintrc.cjs
├─ .git
│  ├─ COMMIT_EDITMSG
│  ├─ config
│  ├─ description
│  ├─ FETCH_HEAD
│  ├─ HEAD
│  ├─ hooks
│  │  ├─ applypatch-msg.sample
│  │  ├─ commit-msg.sample
│  │  ├─ fsmonitor-watchman.sample
│  │  ├─ post-update.sample
│  │  ├─ pre-applypatch.sample
│  │  ├─ pre-commit.sample
│  │  ├─ pre-merge-commit.sample
│  │  ├─ pre-push.sample
│  │  ├─ pre-rebase.sample
│  │  ├─ pre-receive.sample
│  │  ├─ prepare-commit-msg.sample
│  │  ├─ push-to-checkout.sample
│  │  └─ update.sample
│  ├─ index
│  ├─ info
│  │  └─ exclude
│  ├─ objects
│  │  ├─ 02
│  │  │  └─ 43f3b93c22d8941094a961a8c182a0a8bbe154
│  │  ├─ 03
│  │  │  ├─ 7994176046f373f43bf25c4a9e74a77d2aefd7
│  │  │  └─ f5ab3234b837d68525e45815799aca6f09d5ea
│  │  ├─ 04
│  │  │  ├─ 2c891b6ed99c18cb0cef8c6b0128f19c30e591
│  │  │  └─ 5b0f76d19cbb20626df13bab7ed9a7d5953752
│  │  ├─ 08
│  │  │  └─ d0c8265114dd642c372050f4c3ecfa5b997d78
│  │  ├─ 09
│  │  │  └─ 7a87095384336999a860d832d18a0bc1a67340
│  │  ├─ 0b
│  │  │  ├─ 15c1fea0ad7bdcb5ddadda3640ab8c475a6bfd
│  │  │  └─ 1b75618b877355233a8c1afb4fef162a5189ed
│  │  ├─ 0c
│  │  │  └─ 375c9b99d41fabb2e8bb55979e2d8cc951aa7a
│  │  ├─ 0d
│  │  │  └─ 6babeddbdbc9d9ac5bd4d57004229d22dbd864
│  │  ├─ 0e
│  │  │  └─ c28b4700c25732f9d235b3994a886e129cefef
│  │  ├─ 0f
│  │  │  ├─ 1081ed18b688ea1f4971f5c479430cf38d45df
│  │  │  ├─ af2a397d86ad1a9024bcea8f22e2f648be461f
│  │  │  └─ ece4bb7503d5918e52e2d1cddbe44240d4e6d3
│  │  ├─ 11
│  │  │  └─ f02fe2a0061d6e6e1f271b21da95423b448b32
│  │  ├─ 12
│  │  │  └─ 69a301a4ef6ba9500f55b70165941765964da2
│  │  ├─ 13
│  │  │  ├─ 8cc3fc192126ed8e121a677bc55e7625e63696
│  │  │  └─ d3ffc718aa8ac2d16d33c8d5a98ebf79ac1862
│  │  ├─ 14
│  │  │  ├─ 2e68362f441357f11a4a1418573c40e22c3731
│  │  │  ├─ 4f8cb329b86cb01c72f0510d6d4a99ff9a8b48
│  │  │  └─ 655ec6d8040208855ed236dbfd8c8c0c521ddd
│  │  ├─ 15
│  │  │  ├─ 64c2e97b30b16d9ee7cbd15b5a8cfe4fc56a97
│  │  │  └─ 742336d103f865f103f904d08e437af753a246
│  │  ├─ 17
│  │  │  └─ c68df324463e89547ca106c60a473199b98a2a
│  │  ├─ 18
│  │  │  └─ 3fc5c269c681d89ce7b92dd28abda317ee00be
│  │  ├─ 19
│  │  │  └─ f561d5eebab2cdacef81ff15587d0dabf15c75
│  │  ├─ 1b
│  │  │  └─ f682aa0c76a96be7fad5ade909af50fa493d27
│  │  ├─ 1d
│  │  │  ├─ 832e9c056be4b541dd4a8def89b169bc6440c9
│  │  │  └─ c26c69ae1526835075fa2e375c5e64905ca29c
│  │  ├─ 1e
│  │  │  └─ b0127263beed9f4dcf77e14df32ee0e0456cb1
│  │  ├─ 20
│  │  │  └─ 9f8d60bb7730ab1d517ae4823ae6b280e63c39
│  │  ├─ 22
│  │  │  └─ 61bf1a8888a06c1459a9b9624eea98836bb949
│  │  ├─ 24
│  │  │  ├─ a89505740d7321b1b3b35c4861b599c158f960
│  │  │  └─ c5e73a6c112980ba9b5cc8f710c08de2812e21
│  │  ├─ 25
│  │  │  ├─ 5c147913b208168661fa0b1db3e731d0da9de6
│  │  │  └─ e6caafd8ae47b52f481af5065ce2c46fe7b83d
│  │  ├─ 29
│  │  │  └─ 51dc0167c1d95536878fbc8845de861f6cb51b
│  │  ├─ 2b
│  │  │  └─ dc262d01dcffa45f745b116d34a126814a88b0
│  │  ├─ 2c
│  │  │  └─ 602f6c53581b1068ab3ddfca042edff0ed4ef6
│  │  ├─ 2d
│  │  │  └─ 1cee82fa0783defd4738c3e70f3122b4780448
│  │  ├─ 2e
│  │  │  ├─ 7af2b7f1a6f391da1631d93968a9d487ba977d
│  │  │  └─ d9941f3a180db8a225385536b4b299c6591213
│  │  ├─ 2f
│  │  │  ├─ 6a74669f619edcf0b4857b8a73c85a61baf837
│  │  │  ├─ 776a94f51aa15a1f6e27e6fae0c56bc9159c4f
│  │  │  └─ ef91c173529bd4b7943f5691788271696423ba
│  │  ├─ 32
│  │  │  ├─ 25d09e2dbb3ef814e7a742eef331b83ac25951
│  │  │  ├─ 5051b53d75e0e939ded539af1aff1abde6c6a3
│  │  │  └─ ba038541db46843634b67fbe5464120c852f82
│  │  ├─ 37
│  │  │  └─ 977629e6d53840f124f4ee1c29f34993415932
│  │  ├─ 38
│  │  │  ├─ 4ac6b7efb1f6579d905fe6e7d8c138202e1fe6
│  │  │  └─ d1f5e4c8ec353f34ce22b58b0eef26c97af0cb
│  │  ├─ 39
│  │  │  ├─ 51b3a07401c23b9d123b14c249fc6ca63785bb
│  │  │  └─ b05e9fa0d3aace85ea9c4a434b466cbd82a465
│  │  ├─ 3b
│  │  │  ├─ 32283aaf030710e62e03bb62764296e931dea8
│  │  │  ├─ b7847cb34a62d66f3b60f8e22044f4e44ae95e
│  │  │  └─ dbd4e5ea818f49d491a1d6a97d47bb8396533d
│  │  ├─ 3c
│  │  │  ├─ 927d7b68e8e9e22404925d91dd0e34085c2cd8
│  │  │  └─ b151b8c85de414a847a9737522003f55db9848
│  │  ├─ 3d
│  │  │  ├─ 7150da80e43e3650342aa4758fa8b74e95d6d6
│  │  │  ├─ 76491f8fe43a20b1f06233c7de1ff630498500
│  │  │  └─ 8a7c1ec67f61ba8a7287a33bd4b5a1a6cdf784
│  │  ├─ 3e
│  │  │  ├─ 00126caf1d9f649d5bf711996647dc145541b3
│  │  │  ├─ 22f5ab054e7c9cf9e20925b879ecabc9ff2f5d
│  │  │  ├─ b54aa14dfc8ed0a51e373eae9088157badba4f
│  │  │  └─ d80f65e0c26bbafd897ffb41a6b7f4e8d9ef2e
│  │  ├─ 3f
│  │  │  ├─ a49a010de8f1bac653dcd7f8a88b7dbbf6e55b
│  │  │  └─ ead9e12a051d0eb0e4c3c43bea2ab2cc11a348
│  │  ├─ 40
│  │  │  └─ 541650338f832ac69b2968dfda767cdfad4353
│  │  ├─ 41
│  │  │  └─ dd77cfe4f1a436479eb6c37625ad26624c0f03
│  │  ├─ 42
│  │  │  ├─ 77c47d12ea29d06e1792767065796c125758e4
│  │  │  └─ faf9d942317105c33f077948069a586a535b06
│  │  ├─ 43
│  │  │  ├─ 7c2da842ac604380dca8d1b8656a6d4eb5e4b5
│  │  │  └─ 80cc027ed6da2ae239883f73903cf12b8db0ab
│  │  ├─ 44
│  │  │  └─ af6a0065b567804cf317c30e86c70ec8a5f221
│  │  ├─ 46
│  │  │  ├─ 3ebb7fc1c6ae8c2bab89b661148cc8390c787a
│  │  │  ├─ 6829eb13c71221b0e1767377750a89902d4cc1
│  │  │  └─ bdc232bbb644db7c7fabf68893b5f9d6c2027a
│  │  ├─ 47
│  │  │  └─ 150400ecb7867755e13a6632a295767bb31b67
│  │  ├─ 49
│  │  │  ├─ 9a0ff5688900e57c5c7346fc4b32e1b4f6d06d
│  │  │  └─ c0612d5c24aa905f8b947afbf3367746452476
│  │  ├─ 4a
│  │  │  └─ efecbb60a21f749f62f3509622adb12ae0859f
│  │  ├─ 4b
│  │  │  └─ 2db3f07ab285c57609eec2b9dcf902af0e3979
│  │  ├─ 4c
│  │  │  ├─ 145e733a7cb6b8bbc81cd926cdb94b0cb2b4f4
│  │  │  ├─ 1bba8f169648021bdb00cd2d61dd8a3ef74f0d
│  │  │  └─ 7470df445c33b98e2c80fda7c42deaae4d6145
│  │  ├─ 4d
│  │  │  └─ ec750f152520c7fba7ee0b20a14eaa94b7cf23
│  │  ├─ 4f
│  │  │  ├─ 01cf24400b7a33aacdfd03481a41a73c6ccce0
│  │  │  └─ 49c715521bcae9f634ca426049ec7417874539
│  │  ├─ 50
│  │  │  ├─ 87efcc0e4d7a4e142d9daf675581ab0d37ebde
│  │  │  └─ b4ea8af6c8614503efca2b7016a0d425bd7610
│  │  ├─ 51
│  │  │  ├─ 6ca3600d73e64d32ed79ed5c40fa7043b63fd6
│  │  │  └─ 6dc9648351de5375988ea85b3c93c03964a854
│  │  ├─ 52
│  │  │  ├─ b464d9e68bce6feb199a167e71c1e8bf896f4f
│  │  │  └─ b59f875c08dabd28f306a470f46c8d312d8cb2
│  │  ├─ 53
│  │  │  └─ 87f5b5bf3ae22a9fc04e6454c5ccf3ccb9be9e
│  │  ├─ 55
│  │  │  ├─ 7b37c44d5cb352ff331f90e7fba0189cdfa65e
│  │  │  └─ a476bc3b185e6557e59a7fa3f47c83c063bb50
│  │  ├─ 56
│  │  │  └─ 12833a2bb462a81f12f08ecb726ed4c14879f3
│  │  ├─ 58
│  │  │  ├─ a4426883655035194ec3d3b7dac18a69552d55
│  │  │  ├─ ba8e628fa13bc99135c0e936d838d8058300f4
│  │  │  └─ e125775ec551f4140d81a14f6080b6f1e91d66
│  │  ├─ 5a
│  │  │  ├─ 423a5832d2d4956dfe7cf6f23aeb748e03477b
│  │  │  └─ a59dde2724e5f224b80b240437326a49d05d7f
│  │  ├─ 5c
│  │  │  ├─ 7a3a2b7cfdffc2d84e87434d8d397532769307
│  │  │  └─ e62cd3b13224070c88ef580830455ca22469a0
│  │  ├─ 5d
│  │  │  └─ 462485744206e8a8ffddfc7964c339c9d82e8a
│  │  ├─ 60
│  │  │  ├─ 232ea36f64768632dff862e0e5ecc7796cd718
│  │  │  └─ b2f6fafbdfa9e50726fbddfecad2c0520182de
│  │  ├─ 62
│  │  │  └─ f513252e4c55e8656ffa5f2b5d94e54ed9d526
│  │  ├─ 63
│  │  │  ├─ 91e55f9013a3f555859f90c5c8807f7c874aaa
│  │  │  └─ a8c25eb6e84bfda5cb2ae7826987bde9c50371
│  │  ├─ 64
│  │  │  ├─ 37dc1d41ff77cdc5fbf13c211f34b5c60a31b4
│  │  │  └─ a0016ec8624e7119d603dcdf5f9ad5bc2a9cfe
│  │  ├─ 66
│  │  │  └─ 75f46d30c47e811517a13fd9706b671e911d56
│  │  ├─ 67
│  │  │  └─ f6f931e9774409a7a81d56b91fb231e5e64da9
│  │  ├─ 68
│  │  │  ├─ 45843d6a875600a5222d4f2efc08e6a0e43f7a
│  │  │  ├─ 97cc9529117ce7cc225a4c1bb54c33c4f245da
│  │  │  └─ a0cf7c66c2710b03694a92ecf5f53f10886641
│  │  ├─ 69
│  │  │  └─ 3d8423f09faa4f3813ba36091dc96edcc4233d
│  │  ├─ 6a
│  │  │  └─ 6e5f022db51a7a3980572557bf03c2cb43067f
│  │  ├─ 6b
│  │  │  ├─ 6fef8066fecce535ef5dc67197ec72ae6b167e
│  │  │  └─ 9c3143279899a4d9b6b5b9c7c9faa74aa2e8c3
│  │  ├─ 6c
│  │  │  ├─ 087b095e810160d494a6e61dde9dc99385f1d1
│  │  │  ├─ 87de9bb3358469122cc991d5cf578927246184
│  │  │  ├─ d4f030108e00cabc69d35df8bf02deb4baef8d
│  │  │  └─ fa399f1eff71402cfa8243e0ab12cf811c1aed
│  │  ├─ 6d
│  │  │  └─ fbd5876c02b95ac51c85c46c7bd163bcd79712
│  │  ├─ 6e
│  │  │  └─ d54bb7d98f7b0a26f86e83a14a09f3d2bfe5ce
│  │  ├─ 6f
│  │  │  └─ d5cb6914534a714ce1e125b2a3c39e2d70db8a
│  │  ├─ 70
│  │  │  └─ 28abf35e911261233e8756fb7939e08e7b47bc
│  │  ├─ 72
│  │  │  ├─ 42fddab29eedc8644194ba62239e2eca01d574
│  │  │  ├─ 499b55bea457bba33462579481edc086af97cd
│  │  │  ├─ 84909560f07642d5a3c8c1bce920d82667d747
│  │  │  └─ bb70a0debc32f681121b8b975260c1424d928d
│  │  ├─ 73
│  │  │  ├─ 93c3bbcf79278ae5e3b7c42747981cf544ef43
│  │  │  ├─ a15c7d69ced46ed931caeb500a96837a6b5fe8
│  │  │  └─ b0f94015c26f973c5f298e24e7d7be5a1de2ae
│  │  ├─ 75
│  │  │  └─ 815edded23f3d748bf0a5c6786f035ce731cbc
│  │  ├─ 76
│  │  │  └─ 50366f37dbb630a9270ed03d061bb400223d8e
│  │  ├─ 77
│  │  │  └─ a9577db015145d1d2a392fc3f906b159d7f80d
│  │  ├─ 79
│  │  │  ├─ 7680bb81434c6fe5afab5834e36138bfbcd780
│  │  │  └─ c2299dad139917a995421061e0759aa73fe2fa
│  │  ├─ 7a
│  │  │  └─ c3cd7521852b225ed8465e1602397f688acb53
│  │  ├─ 7b
│  │  │  ├─ 683a27b8e8126d41c92e0d86eb55b817e345a2
│  │  │  ├─ a3c56ca0b3dcb3d070d4aff9d48a6e43ef1da2
│  │  │  ├─ aa60c427cbbdd4cae9e4561d1a7b616a5b8221
│  │  │  ├─ c9a796cb6964054868403de56bdeaea3cd11f3
│  │  │  └─ d5da7053a2ed7d5ad65a403eb728854d1411ff
│  │  ├─ 7c
│  │  │  ├─ 2e80f019c55b9ff21e23042d733e583fbbfb25
│  │  │  └─ e32a0de03ea82791763478f37790b56930e73f
│  │  ├─ 7d
│  │  │  └─ 686f125c9e7dc0c7e159898c6ddac2398c955f
│  │  ├─ 80
│  │  │  └─ b503b349a1771284516b7e4757af52f5aaf3da
│  │  ├─ 81
│  │  │  ├─ 8b91f9ac95b5064acf8040689a594ac428ef5b
│  │  │  ├─ aefabd3873f265c42f335f530dc9c1d1d143b2
│  │  │  └─ d59ff8e32056a13d48af6b2476cfc17a18f9e6
│  │  ├─ 82
│  │  │  └─ a7862b95ed0b1893fe9251fc287bb4ff366e14
│  │  ├─ 83
│  │  │  ├─ a571352c70415cd89563fcefe883543a8801b5
│  │  │  └─ a57717f5efb1ead53c2d2a0bddadac5da2074d
│  │  ├─ 85
│  │  │  └─ 5eacc76d5dce4cc3f04d1267851869f306c830
│  │  ├─ 86
│  │  │  └─ 10c3d9aedfed2813a193fa1d18ef6c760e893a
│  │  ├─ 87
│  │  │  └─ b32e00c5535639b6ce5bfe0455139303e80633
│  │  ├─ 88
│  │  │  └─ c7ae3aff777a615720f7aee34dc56da070eefc
│  │  ├─ 89
│  │  │  └─ a305e028000a86c03e85344e31eb59d56354a0
│  │  ├─ 8b
│  │  │  └─ 9ea5b9e0b78e71ead4270a8bacb522c094a337
│  │  ├─ 8c
│  │  │  └─ 9fd48765d6e8901dc166e72293c413c23d8134
│  │  ├─ 8d
│  │  │  └─ 2151710f457715dfb0a04912c62d7bb52a2b95
│  │  ├─ 8e
│  │  │  └─ fb4620b8d5c1109c0cf9e05f06c4b19595b9a7
│  │  ├─ 90
│  │  │  └─ dd126f984b7c90f2746a41e03f59b13c200249
│  │  ├─ 91
│  │  │  ├─ 30c5672e72ae729c5adc4135326bf059ae840b
│  │  │  └─ 53392509972cd3020ca3168aca9fa6eaef11c3
│  │  ├─ 93
│  │  │  └─ 15992bc94d14ebfb93b7c17099042dacc6f843
│  │  ├─ 94
│  │  │  ├─ afde160d3dc7c2015ba6733e7882712f6e5bc0
│  │  │  └─ c0b2fc152a086447a04f62793957235d2475be
│  │  ├─ 95
│  │  │  └─ c3d69272713005d0176b7262639e54fb4080d7
│  │  ├─ 97
│  │  │  └─ ede7ee6f2d37bd2d76e60c0b6a447bee718b05
│  │  ├─ 98
│  │  │  └─ 056f91874ae0fddc67e5c45812c21ad5725df7
│  │  ├─ 99
│  │  │  └─ 00f564adcefa302ba2e521dc7af0d79a29d216
│  │  ├─ 9a
│  │  │  └─ b559f242985953192804a94d25ec5a1651a68d
│  │  ├─ 9b
│  │  │  ├─ 43d0c60e6102459f248007f0349468f4bd5bae
│  │  │  ├─ 58fa4625fe365c8c4afc7ce7224619cefeefdb
│  │  │  └─ 6ee057ff55b38f435a8ada542abee469c38700
│  │  ├─ 9c
│  │  │  └─ 51174f4724f34c7e2a71363db72821fb920470
│  │  ├─ 9d
│  │  │  ├─ 389bd81416aa17469a3c8926629d02d20a98c1
│  │  │  ├─ 492139b8b56cf61a41245307c1aa348539a5f9
│  │  │  └─ e0d63467742c00d63e22510307cf0cc8b816ae
│  │  ├─ 9e
│  │  │  └─ a212638442fd4ed6b83a8974959c275eeee131
│  │  ├─ 9f
│  │  │  ├─ 35fcac9b02239e51398563cc4974c2252c3e52
│  │  │  └─ 4791c4dc308a02084ac396df6cb6cc066c27ef
│  │  ├─ a1
│  │  │  └─ 3659f3e1a3977094bd313cd8a90ea1fd2be61c
│  │  ├─ a2
│  │  │  ├─ 99b5c2180174b151249efda1c959cf90598699
│  │  │  ├─ e8cbdeec8c43e5f81bf9a9704ab33ce3f087bb
│  │  │  └─ f8c3a3075d76a0b9c45cb2015701a1d3eff995
│  │  ├─ a3
│  │  │  └─ 4f60596c8aec3f82677d54a13afd10348c6095
│  │  ├─ a4
│  │  │  └─ 6f2831ad394ab442b9210f2bfcfc11391213b7
│  │  ├─ a5
│  │  │  ├─ 0ed309d4fcfaf43b9ebbf70aa6d61c9e771886
│  │  │  └─ 47bf36d8d11a4f89c59c144f24795749086dd1
│  │  ├─ a6
│  │  │  └─ 21d728d7a751b7c41919257edb4560a2492766
│  │  ├─ a7
│  │  │  └─ 064f9a1bd4f29b01c21051bcb2eb376411fe53
│  │  ├─ a9
│  │  │  ├─ d4b405edf1e8de96101c36d0218e84ec7b9702
│  │  │  └─ e4015e510d1723e81c943080dfe916591f7232
│  │  ├─ ab
│  │  │  └─ 9c072b9e65404f40d711f7d6f48dbc2b9e6e5f
│  │  ├─ ac
│  │  │  └─ d9d7a9aad0548d7aac827f45f7bcdfbdcda553
│  │  ├─ ad
│  │  │  ├─ 2e0dd496dfaf1a9d4d0d06c824d359f571e174
│  │  │  ├─ 4ce8fd530b15d1a8dcec6c4294094026808f00
│  │  │  └─ 52abf4c807e05464dad259dd034343ef2cd241
│  │  ├─ af
│  │  │  ├─ 25dee59dc26a66229c2db74e8f74e8665e8d5a
│  │  │  └─ 4312d488ab4981d72dc8242b764b8276545608
│  │  ├─ b0
│  │  │  └─ 9cc3f7e1522379e544b8a1800464e22f75b0b2
│  │  ├─ b5
│  │  │  ├─ 259a1aba3b8bd58bc3d114f22915f48510b656
│  │  │  └─ c61c956711f981a41e95f7fcf0038436cfbb22
│  │  ├─ b7
│  │  │  └─ dbf6ad3cb38621cca547fade09ea2f0db21016
│  │  ├─ b9
│  │  │  └─ 6285aa9fa381052c46f958f43f86360e5e3511
│  │  ├─ ba
│  │  │  ├─ 28f4918d0841625e8a3e1e68532d1787baafdf
│  │  │  └─ f4b08a4470bf58a28f90860103cba59d921324
│  │  ├─ bb
│  │  │  └─ 841494115bc84fa556d93faa6f8a62de160f42
│  │  ├─ bc
│  │  │  └─ 13484e417fcb27f4a3119ea1b4a2e63462232f
│  │  ├─ bd
│  │  │  ├─ 6213e1dfe6b0a79ce7d8b37d0d2dc70f0250bb
│  │  │  ├─ 930e567c55914d218eb716c77bf531164d241b
│  │  │  ├─ d8531f93a099e39f28f474e48f0216c54d9b92
│  │  │  └─ d9e82330bce500a8aab49b1e9af6c0e46bf9cf
│  │  ├─ bf
│  │  │  └─ feca3dcdc6f67b0b4c79b1bbf62fe19d9a95e9
│  │  ├─ c1
│  │  │  ├─ 41ba7fc13762a5a94899cba33c8fef6d656bcb
│  │  │  └─ dad90bfeb1a6bd389036bdf0bb4b318154a789
│  │  ├─ c4
│  │  │  ├─ 4106ff214006102bfd50858791d8f17472f65a
│  │  │  └─ aa355331a3a1558590a005ad974e2c1bc4abe8
│  │  ├─ c5
│  │  │  └─ 97f861453b0bf2e0b81c4a35a0717458a741db
│  │  ├─ c6
│  │  │  ├─ 4a7c5eb6470715370479c0d856a83936d68bc8
│  │  │  ├─ 609ca4142d23c2d8110d02b6728a456f26df29
│  │  │  └─ 6aa7f3c4e25c44ff2e769f0ba75e37aa1beb01
│  │  ├─ c8
│  │  │  ├─ ecf5ee31f8dbae0162711c5070bf2009a508df
│  │  │  └─ f1301cda4f554ea34dd7c061b3ccc484a137b8
│  │  ├─ c9
│  │  │  └─ 1838f0c6511b6cd0562319860d7f0198a46c4d
│  │  ├─ ca
│  │  │  └─ ea3ddb7cdb62994097b727546eda60094abd30
│  │  ├─ cb
│  │  │  ├─ d956399fb5c819f95074953dbb3c44282e51c1
│  │  │  └─ f777567380ca0c8445330869f8e9778ec771f1
│  │  ├─ cc
│  │  │  ├─ 83cc77e333d83198b5de35f95d7d6db1cbc103
│  │  │  └─ db93a45808ac96eed7b866fe23dfb704d1db20
│  │  ├─ cd
│  │  │  ├─ 06fa6f8360478ac7849c113f1b9c30bce2fa2b
│  │  │  ├─ 22a852492a4cc00d15d16ab53cf83c42fab723
│  │  │  └─ afb5223dbb35d9054185ad860bf230bbd2cdec
│  │  ├─ d0
│  │  │  └─ b7f8f0c83f43cfc9f4cc6f0c5945d51e703ce0
│  │  ├─ d1
│  │  │  ├─ 71c68151ee058a2d7bf8a48ab5701be6a65839
│  │  │  └─ a6c1860208b6d9fad40a982592952fabb59b2c
│  │  ├─ d2
│  │  │  ├─ 6acfbcaa32a3ddc31a40da3159ac1caf62d095
│  │  │  └─ 9753c44c9685c9ff027838ba724bc656518d96
│  │  ├─ d3
│  │  │  ├─ 3d1ac5b49a719c5f869dcc0b4e42f13ddd0359
│  │  │  └─ c01c7b9966d2390d80a5d426a9d52da97ac763
│  │  ├─ d5
│  │  │  └─ f0fcd2751ade1de9e5a3914461719f00de299f
│  │  ├─ d6
│  │  │  ├─ 9fd11ab99ebd4d3f1a95293835d5b196951db5
│  │  │  ├─ c953795300e4256c76542d6bb0fe06f08b5ad6
│  │  │  └─ e67bae9c73c0b9edd052d190fdc49fed79189f
│  │  ├─ d8
│  │  │  └─ 8cfbef7ecf1c1e2da2648000b23705dc6c8f63
│  │  ├─ d9
│  │  │  └─ b2e7c6c9f16c6bf65d2b7f2f9f081992b2aaff
│  │  ├─ dc
│  │  │  └─ dc4fd6417d1e59d159442c92d4830b961473da
│  │  ├─ dd
│  │  │  ├─ 06906960da032b5dd95a3aa0f97a63682ef5f1
│  │  │  └─ d48196a9e587d2e7d78cfa895a0c599f3e5065
│  │  ├─ de
│  │  │  ├─ ba188484882ed06d68e4b69a7c03e03fdb4450
│  │  │  ├─ c0ca367c64209d9b7ab637c08d1989b8f565b2
│  │  │  ├─ dc47c2abaa19b3468ef40de431d82330d23f1b
│  │  │  └─ e21bfa3494d9d6d475c6d421c9c83de916dfd9
│  │  ├─ df
│  │  │  ├─ 6e96107e02ede2cb02da6785b5b2542a67f3ae
│  │  │  ├─ 80ca5f4e6f4a9ca86e17cd5761cafd488dcf7f
│  │  │  └─ fb11c0a7b2e8a5db4726296ea969df7ae5a16d
│  │  ├─ e1
│  │  │  └─ e5959f6c47f51d379ab6fb9ab841d5030d81b9
│  │  ├─ e2
│  │  │  ├─ 44258df0f7c2d9903252de5304815f29040430
│  │  │  └─ af2767dd7aa5a5ff9bbd650813fb6042a41c62
│  │  ├─ e3
│  │  │  ├─ e461c29f5b10af9c269303d6fd69c2040d9d9a
│  │  │  └─ e635586d121e7e3e9b65f40ff228f17fb18972
│  │  ├─ e4
│  │  │  ├─ 13361299917b5ab402316ac7a405af661d609d
│  │  │  └─ b78eae12304a075fa19675c4047061d6ab920d
│  │  ├─ e5
│  │  │  └─ 39d75c5a0e9196ff29b476ff6e68d9e0f72c75
│  │  ├─ e6
│  │  │  └─ 9de29bb2d1d6434b8b29ae775ad8c2e48c5391
│  │  ├─ e7
│  │  │  ├─ a6c3abe5854356d0b94c7d79f6d0ba30eb18a1
│  │  │  └─ b8dfb1b2a60bd50538bec9f876511b9cac21e3
│  │  ├─ e8
│  │  │  └─ 7806f631acf997c49c6e6f2392730c88e8fd27
│  │  ├─ ea
│  │  │  ├─ 2ddc50b3aed7c6123532812d6f2e3c5f2fa353
│  │  │  └─ 8eb81f48f0c8ab6927f64063edc5846d4108f8
│  │  ├─ ec
│  │  │  └─ 3b9342d746d5721bf8986e5b7e89e3cb017de5
│  │  ├─ ef
│  │  │  └─ 42d0fa1a68d1d56034802365f67585e58e00a5
│  │  ├─ f1
│  │  │  └─ f784da5152ee5f114e5a2fa82085e80962b97e
│  │  ├─ f3
│  │  │  └─ 41289976086251ae1fd4a7824f83d84bdd6345
│  │  ├─ f5
│  │  │  ├─ 3f0822bff750a1b0a937395f8d7db22d86acb9
│  │  │  ├─ 627a1d00cb347941d3f113531aa68543753c54
│  │  │  └─ e58fa7d9be48dac8904bff44c7a74a1e956e50
│  │  ├─ f7
│  │  │  └─ 206cad93e1ca3543a27ea1b975ca4eed9f5a47
│  │  ├─ f8
│  │  │  ├─ 0d5bec6ad43d7a74e3e89aebe4822ada61582d
│  │  │  └─ b36e5629b6ff96c990f7d104892771f419827f
│  │  ├─ f9
│  │  │  ├─ 82405989c8045549ccbeb5d59f60ad8d0f7ce5
│  │  │  └─ f89957d3635d2315068b48d9f38cc8c662918b
│  │  ├─ fc
│  │  │  └─ edf0201895a00176305dff0864f8482f7d3e46
│  │  ├─ ff
│  │  │  ├─ 428581af16c6fc3b7e06f944d9c591cb178c5e
│  │  │  └─ 8b4c56321a3362fc00224b01800f62466f9a1f
│  │  ├─ info
│  │  └─ pack
│  └─ refs
│     ├─ heads
│     │  └─ main
│     ├─ remotes
│     │  └─ origin
│     │     ├─ dev
│     │     └─ main
│     └─ tags
├─ .gitignore
├─ .prettierrc
├─ index.html
├─ package.json
├─ pnpm-lock.yaml
├─ postcss.config.js
├─ public
│  └─ vite.svg
├─ README.md
├─ src
│  ├─ App.tsx
│  ├─ assets
│  │  └─ react.svg
│  ├─ components
│  │  ├─ Avatar
│  │  │  └─ UserAvatar.tsx
│  │  ├─ Button
│  │  │  └─ LoadingButton.tsx
│  │  ├─ Editor
│  │  │  └─ Editor.tsx
│  │  ├─ Form
│  │  │  ├─ CheckboxInput.tsx
│  │  │  ├─ SearchInput.tsx
│  │  │  ├─ SelectInput.tsx
│  │  │  ├─ SimpleForm.tsx
│  │  │  └─ TextInput.tsx
│  │  ├─ Kanban
│  │  │  └─ PriorityLabel.tsx
│  │  ├─ Link
│  │  ├─ Loading
│  │  │  └─ PageLoader.tsx
│  │  └─ Table
│  │     └─ DataTable.tsx
│  ├─ constants
│  │  ├─ domain.ts
│  │  └─ queryKeys.ts
│  ├─ hooks
│  │  ├─ index.ts
│  │  ├─ mutations
│  │  │  ├─ useAddOrganizationMemberMutation.ts
│  │  │  ├─ useAddTimeLogMutation.ts
│  │  │  ├─ useCreateAccountMutation.ts
│  │  │  ├─ useCreateOrganizationMutation.ts
│  │  │  ├─ useCreateProjectMutation.ts
│  │  │  ├─ useCreateSprintMutation.ts
│  │  │  ├─ useCreateTaskMutation.ts
│  │  │  ├─ useLoginMutation.ts
│  │  │  ├─ useUpdateTaskColumnMutation.ts
│  │  │  ├─ useUpdateTaskMutation.ts
│  │  │  └─ useVerifyAccountMutation.ts
│  │  ├─ queries
│  │  │  ├─ useActiveSprintQuery.ts
│  │  │  ├─ useBacklogTasksQuery.ts
│  │  │  ├─ useGetProjectColumnsQuery.ts
│  │  │  ├─ useOrganizationMembersQuery.ts
│  │  │  ├─ useOrganizationProjectsQuery.ts
│  │  │  ├─ useProjectBoardQuery.ts
│  │  │  ├─ useProjectDetailsQuery.ts
│  │  │  ├─ useTaskDetailsQuery.ts
│  │  │  ├─ useUserOrganizationsQuery.ts
│  │  │  └─ useUserProjectsQuery.ts
│  │  ├─ useMenu.tsx
│  │  ├─ useModal.ts
│  │  ├─ useSearchValue.ts
│  │  ├─ useToast.ts
│  │  └─ useToken.ts
│  ├─ index.css
│  ├─ main.tsx
│  ├─ pages
│  │  ├─ (Auth)
│  │  │  ├─ components
│  │  │  │  ├─ CreateAccountForm.tsx
│  │  │  │  └─ LoginForm.tsx
│  │  │  ├─ CreateAccount
│  │  │  │  └─ Page.tsx
│  │  │  └─ Login
│  │  │     └─ Page.tsx
│  │  ├─ layouts
│  │  │  ├─ AuthLayout.tsx
│  │  │  ├─ BaseLayout.tsx
│  │  │  └─ components
│  │  │     ├─ Content.tsx
│  │  │     ├─ SettingsButton.tsx
│  │  │     ├─ Sidebar.tsx
│  │  │     └─ TopBar.tsx
│  │  ├─ Organizations
│  │  │  ├─ components
│  │  │  │  └─ CreateOrganizationDialog.tsx
│  │  │  ├─ OrganizationDetails.tsx
│  │  │  └─ Organizations.tsx
│  │  └─ Project
│  │     ├─ components
│  │     │  ├─ Column.tsx
│  │     │  ├─ SprintDialog.tsx
│  │     │  ├─ TaskCard.tsx
│  │     │  ├─ TaskDialog.tsx
│  │     │  └─ TimeLogDialog.tsx
│  │     ├─ ProjectBacklog.tsx
│  │     ├─ ProjectDetails.tsx
│  │     └─ Projects.tsx
│  ├─ routes
│  │  ├─ index.ts
│  │  └─ router.tsx
│  ├─ theme
│  │  ├─ index.ts
│  │  ├─ theme.ts
│  │  └─ ThemeProvider.tsx
│  ├─ types
│  │  └─ apiSchema.ts
│  ├─ utils
│  │  ├─ api.ts
│  │  ├─ auth.ts
│  │  ├─ common.ts
│  │  └─ theme.ts
│  └─ vite-env.d.ts
├─ tailwind.config.js
├─ tsconfig.json
├─ tsconfig.node.json
└─ vite.config.ts

```