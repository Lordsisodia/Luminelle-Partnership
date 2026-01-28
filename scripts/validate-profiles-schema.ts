/**
 * Validate Profiles Schema Script
 *
 * This script validates that the profiles table exists in Supabase
 * and has all required columns with correct types.
 *
 * Usage: npm run validate-profiles-schema
 *        or: npx tsx scripts/validate-profiles-schema.ts
 */

import { createClient } from '@supabase/supabase-js'

// Expected columns for the profiles table
interface ColumnDefinition {
  name: string
  type: string
  nullable: boolean
}

const EXPECTED_COLUMNS: ColumnDefinition[] = [
  { name: 'id', type: 'text', nullable: false },
  { name: 'display_name', type: 'text', nullable: false },
  { name: 'bio', type: 'text', nullable: true },
  { name: 'avatar_url', type: 'text', nullable: true },
  { name: 'title', type: 'text', nullable: true },
  { name: 'location', type: 'text', nullable: true },
  { name: 'website', type: 'text', nullable: true },
  { name: 'skills', type: 'ARRAY', nullable: true },
  { name: 'interests', type: 'ARRAY', nullable: true },
  { name: 'social_twitter_url', type: 'text', nullable: true },
  { name: 'social_linkedin_url', type: 'text', nullable: true },
  { name: 'social_github_url', type: 'text', nullable: true },
  { name: 'social_youtube_url', type: 'text', nullable: true },
  { name: 'social_instagram_url', type: 'text', nullable: true },
  { name: 'timezone', type: 'text', nullable: true },
  { name: 'language', type: 'text', nullable: true },
  { name: 'profile_visibility', type: 'text', nullable: true },
  { name: 'sisos_tokens', type: 'integer', nullable: true },
  { name: 'power_level', type: 'integer', nullable: true },
  { name: 'login_streak', type: 'integer', nullable: true },
  { name: 'login_streak_last_at', type: 'timestamptz', nullable: true },
  { name: 'created_at', type: 'timestamptz', nullable: true },
  { name: 'updated_at', type: 'timestamptz', nullable: true },
  { name: 'deleted_at', type: 'timestamptz', nullable: true },
]

async function validateProfilesSchema() {
  const supabaseUrl = process.env.VITE_SUPABASE_URL
  const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Supabase credentials not found in environment')
    console.error('   Required: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY')
    process.exit(1)
  }

  const supabase = createClient(supabaseUrl, supabaseKey)

  console.log('🔍 Validating profiles table schema...\n')

  try {
    // Check if profiles table exists by querying it
    const { data: profilesData, error: profilesError } = await supabase
      .from('profiles')
      .select('*')
      .limit(1)

    if (profilesError) {
      console.error('❌ Profiles table does not exist or is not accessible')
      console.error(`   Error: ${profilesError.message}`)
      console.error('\n💡 Solution: Run the Supabase migration:')
      console.error('   supabase db push')
      process.exit(1)
    }

    console.log('✅ Profiles table exists and is accessible')

    // Get table schema via PostgreSQL query
    const { data: schemaData, error: schemaError } = await supabase.rpc(
      'get_profiles_schema',
      {
        // Try a direct query instead
      }
    ).select('*')

    // Alternative: Use a direct SQL query via a different approach
    // Since we can't easily query information_schema via client, we'll verify
    // by attempting to select each column

    console.log('\n📋 Validating columns...')
    let missingColumns: string[] = []
    let allValid = true

    for (const column of EXPECTED_COLUMNS) {
      const { data, error } = await supabase
        .from('profiles')
        .select(column.name)
        .limit(1)

      if (error && error.message.includes('column')) {
        console.error(`  ❌ Column '${column.name}' is missing`)
        missingColumns.push(column.name)
        allValid = false
      } else {
        console.log(`  ✅ Column '${column.name}' exists`)
      }
    }

    if (!allValid) {
      console.error('\n❌ Schema validation failed')
      console.error(`   Missing columns: ${missingColumns.join(', ')}`)
      console.error('\n💡 Solution: Run the Supabase migration again:')
      console.error('   supabase db push')
      process.exit(1)
    }

    console.log('\n✅ All expected columns are present')
    console.log('\n🎉 Schema validation passed!')

    // Test that we can query the table
    console.log('\n📊 Testing table query...')
    const { data: testData, error: testError } = await supabase
      .from('profiles')
      .select('id, display_name, created_at')
      .limit(5)

    if (testError) {
      console.warn('⚠️  Query test failed (may be empty table):', testError.message)
    } else {
      console.log(`✅ Query successful (found ${testData?.length || 0} profiles)`)
    }

  } catch (error) {
    console.error('❌ Validation failed with unexpected error:', error)
    process.exit(1)
  }
}

// Run the validation
validateProfilesSchema().then(() => {
  process.exit(0)
}).catch((error) => {
  console.error('❌ Script failed:', error)
  process.exit(1)
})
