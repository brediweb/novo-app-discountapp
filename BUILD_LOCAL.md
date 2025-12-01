# Guia de Build Local com Keystore

## Credenciais do Keystore

As credenciais do keystore de produção são:
- **Keystore password**: `12345678`
- **Key alias**: `discountapp`
- **Key password**: (vazio/null)

## Opção 1: Build Local com EAS (Recomendado)

O EAS pode usar credenciais gerenciadas automaticamente. Para build local:

```bash
# Build local gerando .aab
npm run build:android:local:aab

# Ou diretamente
eas build --platform android --local --profile production
```

O EAS vai:
1. Usar credenciais salvas no servidor EAS (se já configuradas)
2. Ou pedir para você fornecer as credenciais durante o build

## Opção 2: Configurar Credenciais no EAS

Se as credenciais ainda não estão configuradas no EAS:

```bash
# Configurar credenciais Android
eas credentials

# Escolha:
# - Android
# - Set up credentials for production
# - For production builds
# - Upload keystore (se você tiver o arquivo .keystore ou .jks)
#   OU
# - Generate new keystore (se não tiver)
```

Quando solicitado, forneça:
- Keystore password: `12345678`
- Key alias: `discountapp`
- Key password: (deixe vazio ou pressione Enter)

## Opção 3: Build Direto com Gradle (Sem EAS)

Se você tiver o arquivo `.keystore` ou `.jks` de produção:

1. Coloque o arquivo em `android/app/` (ex: `android/app/discountapp.keystore`)

2. Configure o `android/app/build.gradle`:

```gradle
signingConfigs {
    debug {
        storeFile file('debug.keystore')
        storePassword 'android'
        keyAlias 'androiddebugkey'
        keyPassword 'android'
    }
    release {
        storeFile file('discountapp.keystore')
        storePassword '12345678'
        keyAlias 'discountapp'
        keyPassword ''
    }
}
buildTypes {
    release {
        signingConfig signingConfigs.release
        // ... outras configurações
    }
}
```

3. Build direto:
```bash
cd android
./gradlew bundleRelease
```

O arquivo `.aab` será gerado em `android/app/build/outputs/bundle/release/app-release.aab`

## Verificar Credenciais no EAS

```bash
eas credentials
```

## Nota Importante

⚠️ **NUNCA** commite o arquivo `.keystore` ou `.jks` no Git!
⚠️ Mantenha as credenciais seguras e não compartilhe publicamente.

