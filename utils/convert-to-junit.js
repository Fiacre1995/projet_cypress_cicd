// scripts/convert-to-junit.js
const fs = require('fs');
const path = require('path');

function convertMochawesomeToJUnit(inputFile, outputFile) {
  try {
    // Lire le rapport Mochawesome fusionné
    const mochawesomeData = JSON.parse(fs.readFileSync(inputFile, 'utf8'));
    
    const { stats, results } = mochawesomeData;
    
    // En-tête XML JUnit
    let junitXml = `<?xml version="1.0" encoding="UTF-8"?>
<testsuites name="Cypress Cucumber Tests" tests="${stats.tests}" failures="${stats.failures}" errors="0" skipped="${stats.pending + stats.skipped}" time="${(stats.duration / 1000).toFixed(3)}">`;

    // Traiter chaque suite de tests
    results.forEach((rootSuite, rootIndex) => {
      if (rootSuite.suites && rootSuite.suites.length > 0) {
        rootSuite.suites.forEach((suite, suiteIndex) => {
          const suiteName = suite.title || `Suite-${suiteIndex}`;
          const suiteTests = suite.tests || [];
          const suitePasses = suite.passes ? suite.passes.length : 0;
          const suiteFailures = suite.failures ? suite.failures.length : 0;
          const suitePending = suite.pending ? suite.pending.length : 0;
          const suiteSkipped = suite.skipped ? suite.skipped.length : 0;
          const suiteTime = (suite.duration / 1000).toFixed(3);

          junitXml += `
  <testsuite name="${escapeXml(suiteName)}" tests="${suiteTests.length}" failures="${suiteFailures}" errors="0" skipped="${suitePending + suiteSkipped}" time="${suiteTime}" timestamp="${new Date(stats.start).toISOString()}">`;

          // Traiter chaque test individuel
          suiteTests.forEach(test => {
            const testName = test.title || 'Unnamed Test';
            const testTime = test.duration ? (test.duration / 1000).toFixed(3) : '0.000';
            const testFullTitle = test.fullTitle || testName;

            junitXml += `
    <testcase classname="${escapeXml(suiteName)}" name="${escapeXml(testName)}" time="${testTime}">`;

            // Gérer les états des tests
            if (test.state === 'failed' && test.err) {
              const errorMessage = test.err.message || 'Test failed';
              const errorStack = test.err.stack || test.err.message || 'No error details available';
              
              junitXml += `
      <failure message="${escapeXml(errorMessage)}" type="AssertionError">
        <![CDATA[${errorStack}]]>
      </failure>`;
            } else if (test.pending || test.state === 'pending') {
              junitXml += `
      <skipped message="Test marked as pending"/>`;
            } else if (test.skipped || test.state === 'skipped') {
              junitXml += `
      <skipped message="Test skipped"/>`;
            }

            // Ajouter les propriétés personnalisées pour Xray (optionnel)
            if (test.uuid) {
              junitXml += `
      <properties>
        <property name="test.uuid" value="${test.uuid}"/>
      </properties>`;
            }

            junitXml += `
    </testcase>`;
          });

          junitXml += `
  </testsuite>`;
        });
      }
    });

    junitXml += `
</testsuites>`;

    // Sauvegarder le fichier JUnit XML
    fs.writeFileSync(outputFile, junitXml, 'utf8');
    
    console.log(`✅ Conversion réussie: ${inputFile} → ${outputFile}`);
    console.log(`📊 Statistiques: ${stats.tests} tests, ${stats.passes} réussis, ${stats.failures} échecs`);
    
    return true;
  } catch (error) {
    console.error('❌ Erreur lors de la conversion:', error.message);
    return false;
  }
}

// Fonction utilitaire pour échapper les caractères XML
function escapeXml(text) {
  if (typeof text !== 'string') return '';
  
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Utilisation du script
const inputFile = process.argv[2] || 'cypress/reports/cucumber-report.json';
const outputFile = process.argv[3] || 'cypress/reports/junit-results.xml';

// Créer le dossier de sortie s'il n'existe pas
const outputDir = path.dirname(outputFile);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Exécuter la conversion
if (fs.existsSync(inputFile)) {
  convertMochawesomeToJUnit(inputFile, outputFile);
} else {
  console.error(`❌ Fichier d'entrée non trouvé: ${inputFile}`);
  process.exit(1);
}

module.exports = { convertMochawesomeToJUnit };