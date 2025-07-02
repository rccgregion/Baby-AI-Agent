import { ResearchProject } from '../store/researchStore'

export const generateResearchPaper = (project: ResearchProject): string => {
  const completedPhases = project.phases.filter(phase => phase.status === 'approved')
  
  let content = `# ${project.title}

## Abstract

This ${project.academicLevel}-level research paper explores ${project.topic} within the field of ${project.fieldOfStudy}. The study employs a ${project.methodologyPreference} approach to investigate key aspects of the research question. ${project.context ? `The research is contextualized within ${project.context}.` : ''} This paper contributes to the existing body of knowledge by providing new insights and recommendations for future research and practice.

**Keywords:** ${project.fieldOfStudy}, ${project.methodologyPreference} research, ${project.context || 'academic research'}

---

## Table of Contents

1. [Introduction](#introduction)
2. [Literature Review](#literature-review)
3. [Methodology](#methodology)
4. [Results](#results)
5. [Discussion](#discussion)
6. [Conclusion](#conclusion)
7. [References](#references)

---
`

  // Add content for each completed phase
  completedPhases.forEach(phase => {
    switch (phase.id) {
      case 1:
        content += generateIntroduction(project)
        break
      case 2:
        content += generateLiteratureReview(project)
        break
      case 3:
        content += generateMethodology(project)
        break
      case 4:
        content += generateResults(project)
        break
      case 5:
        content += generateDiscussion(project)
        break
      case 6:
        content += generateConclusion(project)
        break
    }
  })

  // Add references section
  content += generateReferences(project)

  return content
}

const generateIntroduction = (project: ResearchProject): string => {
  return `## 1. Introduction

### 1.1 Background

The field of ${project.fieldOfStudy} has witnessed significant developments in recent years, particularly in areas related to ${project.topic}. ${project.context ? `Within the context of ${project.context}, ` : ''}this research addresses critical gaps in our understanding of the subject matter.

### 1.2 Research Question

${project.researchQuestion || `This study seeks to examine the key factors and implications related to ${project.topic} within the ${project.fieldOfStudy} domain.`}

### 1.3 Research Objectives

The primary objectives of this research are to:

- Analyze the current state of knowledge regarding ${project.topic}
- Identify key patterns, trends, and relationships within the research domain
- Provide evidence-based recommendations for theory and practice
- Contribute to the advancement of ${project.fieldOfStudy} scholarship

### 1.4 Significance of the Study

This research contributes to the ${project.fieldOfStudy} literature by providing new insights into ${project.topic}. The findings have implications for researchers, practitioners, and policymakers working in related areas.

---

`
}

const generateLiteratureReview = (project: ResearchProject): string => {
  return `## 2. Literature Review

### 2.1 Theoretical Framework

The theoretical foundation for this study draws upon established frameworks within ${project.fieldOfStudy}. Key theoretical perspectives include:

- **Primary Theoretical Lens**: Foundational theories that inform our understanding of ${project.topic}
- **Supporting Frameworks**: Complementary theoretical approaches that enhance the analytical framework
- **Contemporary Developments**: Recent theoretical advances relevant to the research question

### 2.2 Empirical Literature

#### 2.2.1 Historical Development

The study of ${project.topic} within ${project.fieldOfStudy} has evolved significantly over the past decades. Early research focused on fundamental concepts and basic relationships, while contemporary studies have expanded to include more sophisticated analytical approaches.

#### 2.2.2 Current Research Trends

Recent literature reveals several key trends:

1. **Methodological Sophistication**: Increasing use of ${project.methodologyPreference} approaches
2. **Interdisciplinary Integration**: Growing collaboration across related fields
3. **Practical Applications**: Enhanced focus on real-world implications and applications

### 2.3 Research Gaps

Despite significant advances, several gaps remain in the literature:

- Limited research in specific contexts${project.context ? ` such as ${project.context}` : ''}
- Need for more comprehensive ${project.methodologyPreference} studies
- Insufficient attention to long-term implications and outcomes

### 2.4 Conceptual Model

Based on the literature review, this study proposes a conceptual model that integrates key variables and relationships identified in previous research. The model serves as the foundation for the empirical investigation.

---

`
}

const generateMethodology = (project: ResearchProject): string => {
  return `## 3. Methodology

### 3.1 Research Design

This study employs a ${project.methodologyPreference} research design to address the research question. The chosen approach is appropriate for exploring ${project.topic} within the ${project.fieldOfStudy} context.

### 3.2 Research Philosophy

The research is grounded in a pragmatic philosophical approach, recognizing the value of multiple perspectives and methods in understanding complex phenomena.

### 3.3 Data Collection

#### 3.3.1 ${project.methodologyPreference === 'qualitative' ? 'Qualitative Data Collection' : project.methodologyPreference === 'quantitative' ? 'Quantitative Data Collection' : 'Mixed Methods Data Collection'}

${project.methodologyPreference === 'qualitative' 
  ? `**Interview Protocol**: Semi-structured interviews were conducted with key stakeholders to gather in-depth insights into ${project.topic}.

**Participant Selection**: Purposive sampling was used to select participants with relevant experience and knowledge.

**Data Saturation**: Data collection continued until theoretical saturation was achieved.`
  : project.methodologyPreference === 'quantitative'
  ? `**Survey Instrument**: A structured questionnaire was developed to measure key variables related to ${project.topic}.

**Sampling Strategy**: Random sampling was employed to ensure representativeness of the target population.

**Sample Size**: Power analysis indicated a minimum sample size of 200 participants for adequate statistical power.`
  : `**Sequential Explanatory Design**: The study employed a two-phase approach, beginning with quantitative data collection followed by qualitative exploration.

**Integration Strategy**: Data integration occurred at the interpretation stage to provide comprehensive insights.`}

### 3.4 Data Analysis

${project.methodologyPreference === 'qualitative'
  ? `**Thematic Analysis**: Interview transcripts were analyzed using inductive thematic analysis to identify key patterns and themes.

**Coding Process**: Initial coding was followed by focused coding and theoretical coding to develop analytical categories.

**Trustworthiness**: Multiple strategies were employed to ensure credibility, transferability, dependability, and confirmability.`
  : project.methodologyPreference === 'quantitative'
  ? `**Statistical Analysis**: Descriptive and inferential statistics were used to analyze survey data.

**Software**: SPSS version 28 was used for all statistical analyses.

**Significance Level**: Alpha was set at 0.05 for all statistical tests.`
  : `**Integrated Analysis**: Both quantitative and qualitative data were analyzed separately before integration.

**Joint Displays**: Visual representations were created to illustrate the relationship between quantitative and qualitative findings.`}

### 3.5 Ethical Considerations

The research was conducted in accordance with institutional ethical guidelines. Informed consent was obtained from all participants, and confidentiality was maintained throughout the study.

---

`
}

const generateResults = (project: ResearchProject): string => {
  return `## 4. Results

### 4.1 Overview

This section presents the findings from the ${project.methodologyPreference} analysis of data related to ${project.topic}. The results are organized according to the key research themes identified in the methodology.

### 4.2 ${project.methodologyPreference === 'qualitative' ? 'Thematic Findings' : project.methodologyPreference === 'quantitative' ? 'Statistical Findings' : 'Integrated Findings'}

${project.methodologyPreference === 'qualitative'
  ? `#### 4.2.1 Theme 1: Core Concepts and Definitions

Participants consistently emphasized the importance of clear conceptual understanding in ${project.topic}. Key sub-themes included:

- **Definitional Clarity**: The need for precise terminology and shared understanding
- **Contextual Variations**: How concepts vary across different settings${project.context ? ` particularly in ${project.context}` : ''}
- **Practical Implications**: The real-world significance of theoretical concepts

#### 4.2.2 Theme 2: Challenges and Barriers

Several challenges were identified by participants:

- **Resource Constraints**: Limited availability of necessary resources
- **Institutional Factors**: Organizational and systemic barriers
- **Knowledge Gaps**: Areas where additional understanding is needed

#### 4.2.3 Theme 3: Opportunities and Solutions

Participants also identified potential solutions and opportunities:

- **Innovative Approaches**: New methods and strategies for addressing challenges
- **Collaborative Efforts**: The importance of partnership and cooperation
- **Future Directions**: Promising areas for development and growth`
  : project.methodologyPreference === 'quantitative'
  ? `#### 4.2.1 Descriptive Statistics

The sample consisted of 250 participants with the following characteristics:

| Variable | Mean | SD | Range |
|----------|------|----|----- |
| Age | 34.2 | 8.7 | 22-65 |
| Experience | 7.3 | 4.2 | 1-25 |
| Education Level | 3.8 | 1.1 | 1-5 |

#### 4.2.2 Inferential Statistics

**Correlation Analysis**: Significant positive correlations were found between key variables (r = 0.67, p < 0.001).

**Regression Analysis**: The model explained 45% of the variance in the dependent variable (R² = 0.45, F(3,246) = 67.2, p < 0.001).

**Group Comparisons**: ANOVA revealed significant differences between groups (F(2,247) = 12.8, p < 0.001).

#### 4.2.3 Key Findings

1. **Primary Finding**: Strong relationship between variables X and Y
2. **Secondary Finding**: Significant group differences in outcome measures
3. **Tertiary Finding**: Mediating effects of contextual factors`
  : `#### 4.2.1 Quantitative Phase Results

**Survey Findings**: 200 participants completed the survey with a response rate of 78%.

**Key Statistics**: 
- Mean satisfaction score: 4.2/5.0 (SD = 0.8)
- 85% reported positive experiences
- Significant correlation between variables (r = 0.62, p < 0.01)

#### 4.2.2 Qualitative Phase Results

**Interview Insights**: 15 in-depth interviews provided rich contextual understanding.

**Emergent Themes**:
- Implementation challenges
- Success factors
- Recommendations for improvement

#### 4.2.3 Integrated Analysis

The integration of quantitative and qualitative findings revealed:
- Convergent evidence supporting key hypotheses
- Divergent perspectives on implementation strategies
- Complementary insights into underlying mechanisms`}

### 4.3 Additional Findings

Secondary analyses revealed several noteworthy patterns:

- **Demographic Variations**: Differences across participant characteristics
- **Contextual Factors**: The influence of environmental and situational variables
- **Temporal Patterns**: Changes observed over time

### 4.4 Summary

The results provide strong evidence for the research hypotheses and contribute new insights to the ${project.fieldOfStudy} literature on ${project.topic}.

---

`
}

const generateDiscussion = (project: ResearchProject): string => {
  return `## 5. Discussion

### 5.1 Interpretation of Findings

The results of this study provide significant insights into ${project.topic} within the ${project.fieldOfStudy} domain. The findings support the theoretical framework proposed in the literature review and extend our understanding in several important ways.

#### 5.1.1 Theoretical Implications

The study's findings have several theoretical implications:

- **Framework Validation**: The results support key aspects of the proposed theoretical model
- **Conceptual Refinement**: Findings suggest refinements to existing theoretical constructs
- **New Theoretical Insights**: The research contributes novel theoretical perspectives

#### 5.1.2 Empirical Contributions

This research makes several empirical contributions to the literature:

- **Methodological Innovation**: The ${project.methodologyPreference} approach provided unique insights
- **Contextual Understanding**: ${project.context ? `The focus on ${project.context} revealed context-specific patterns` : 'The research revealed important contextual factors'}
- **Comprehensive Analysis**: The study's scope enabled comprehensive examination of the phenomenon

### 5.2 Practical Implications

The findings have important implications for practice:

#### 5.2.1 For Practitioners

- **Implementation Strategies**: Evidence-based approaches for practical application
- **Best Practices**: Identification of effective methods and techniques
- **Professional Development**: Implications for training and capacity building

#### 5.2.2 For Policymakers

- **Policy Recommendations**: Evidence-based suggestions for policy development
- **Resource Allocation**: Insights into effective resource utilization
- **Strategic Planning**: Long-term considerations for strategic initiatives

### 5.3 Comparison with Previous Research

The findings are consistent with previous research in several areas while also revealing new insights:

- **Confirmatory Evidence**: Results support findings from earlier studies
- **Contradictory Findings**: Some results challenge existing assumptions
- **Novel Discoveries**: The study reveals previously unexplored aspects

### 5.4 Limitations

Several limitations should be acknowledged:

#### 5.4.1 Methodological Limitations

- **Sample Characteristics**: Potential limitations in sample representativeness
- **Data Collection**: Constraints in data collection methods
- **Analytical Approach**: Limitations of the chosen analytical strategy

#### 5.4.2 Contextual Limitations

- **Generalizability**: Questions about the broader applicability of findings
- **Temporal Factors**: Time-related constraints on the research
- **Cultural Considerations**: Potential cultural specificity of results

### 5.5 Future Research Directions

This study opens several avenues for future research:

- **Longitudinal Studies**: The need for long-term investigations
- **Cross-Cultural Research**: Exploration in different cultural contexts
- **Methodological Innovations**: Development of new research approaches
- **Interdisciplinary Collaboration**: Opportunities for cross-disciplinary research

---

`
}

const generateConclusion = (project: ResearchProject): string => {
  return `## 6. Conclusion

### 6.1 Summary of Key Findings

This research has provided valuable insights into ${project.topic} within the ${project.fieldOfStudy} domain. The ${project.methodologyPreference} approach enabled comprehensive examination of the research question, yielding several key findings:

1. **Primary Contribution**: The study demonstrates the importance of [key finding]
2. **Secondary Insights**: Additional findings reveal [supporting evidence]
3. **Methodological Advances**: The research approach contributes to methodological knowledge

### 6.2 Theoretical Contributions

The study makes several important theoretical contributions:

- **Framework Development**: Enhancement of existing theoretical frameworks
- **Conceptual Clarity**: Improved understanding of key concepts
- **Model Validation**: Empirical support for theoretical propositions

### 6.3 Practical Implications

The research has significant practical implications:

- **Professional Practice**: Evidence-based recommendations for practitioners
- **Policy Development**: Insights for policy formulation and implementation
- **Organizational Applications**: Strategies for organizational improvement

### 6.4 Research Impact

This study contributes to the ${project.fieldOfStudy} literature by:

- **Filling Knowledge Gaps**: Addressing identified gaps in existing research
- **Methodological Innovation**: Demonstrating effective research approaches
- **Empirical Evidence**: Providing robust empirical support for theoretical propositions

### 6.5 Recommendations

Based on the findings, several recommendations are proposed:

#### 6.5.1 For Researchers

- **Future Studies**: Specific directions for subsequent research
- **Methodological Considerations**: Recommendations for research design
- **Collaborative Opportunities**: Suggestions for interdisciplinary collaboration

#### 6.5.2 For Practitioners

- **Implementation Strategies**: Practical approaches for applying findings
- **Professional Development**: Training and capacity building recommendations
- **Quality Improvement**: Strategies for enhancing practice

#### 6.5.3 For Policymakers

- **Policy Development**: Evidence-based policy recommendations
- **Resource Allocation**: Efficient use of available resources
- **Strategic Planning**: Long-term strategic considerations

### 6.6 Final Thoughts

This research represents a significant contribution to our understanding of ${project.topic} within ${project.fieldOfStudy}. The findings provide a foundation for future research and offer practical insights for improving practice and policy. ${project.context ? `The focus on ${project.context} provides valuable context-specific insights that enhance the broader applicability of the findings.` : ''}

The study demonstrates the value of ${project.methodologyPreference} research approaches in advancing knowledge and understanding in this important area. As the field continues to evolve, this research provides a solid foundation for future investigations and practical applications.

---

`
}

const generateReferences = (project: ResearchProject): string => {
  const citationStyle = project.citationStyle.toUpperCase()
  
  return `## References

*Note: This is a simulated research paper. In actual research, this section would contain real, peer-reviewed sources formatted according to ${citationStyle} style guidelines.*

### Sample References (${citationStyle} Format)

${project.citationStyle === 'apa' ? `
Anderson, J. M., & Smith, K. L. (2023). *Advances in ${project.fieldOfStudy}: Contemporary perspectives*. Academic Press.

Brown, R. T., Johnson, M. P., & Davis, S. A. (2022). Methodological innovations in ${project.methodologyPreference} research. *Journal of ${project.fieldOfStudy}*, 45(3), 123-145. https://doi.org/10.1000/example

Chen, L., & Wilson, D. R. (2023). Theoretical frameworks for understanding ${project.topic}. *International Review of ${project.fieldOfStudy}*, 78(2), 234-256.

Garcia, M. E. (2022). *Research methods in ${project.fieldOfStudy}: A comprehensive guide*. University Publishers.

Thompson, A. B., Lee, C. H., & Martinez, P. J. (2023). Empirical investigations of ${project.topic}: A systematic review. *Annual Review of ${project.fieldOfStudy}*, 12, 89-112.
` : project.citationStyle === 'mla' ? `
Anderson, John M., and Karen L. Smith. *Advances in ${project.fieldOfStudy}: Contemporary Perspectives*. Academic Press, 2023.

Brown, Robert T., et al. "Methodological Innovations in ${project.methodologyPreference} Research." *Journal of ${project.fieldOfStudy}*, vol. 45, no. 3, 2022, pp. 123-145.

Chen, Linda, and David R. Wilson. "Theoretical Frameworks for Understanding ${project.topic}." *International Review of ${project.fieldOfStudy}*, vol. 78, no. 2, 2023, pp. 234-256.

Garcia, Maria E. *Research Methods in ${project.fieldOfStudy}: A Comprehensive Guide*. University Publishers, 2022.

Thompson, Andrew B., et al. "Empirical Investigations of ${project.topic}: A Systematic Review." *Annual Review of ${project.fieldOfStudy}*, vol. 12, 2023, pp. 89-112.
` : `
Anderson, J. M., & Smith, K. L. (2023). *Advances in ${project.fieldOfStudy}: Contemporary perspectives*. Academic Press.

Brown, R. T., Johnson, M. P., & Davis, S. A. (2022). "Methodological innovations in ${project.methodologyPreference} research." *Journal of ${project.fieldOfStudy}* 45, no. 3: 123-145.

Chen, L., & Wilson, D. R. (2023). "Theoretical frameworks for understanding ${project.topic}." *International Review of ${project.fieldOfStudy}* 78, no. 2: 234-256.

Garcia, M. E. (2022). *Research methods in ${project.fieldOfStudy}: A comprehensive guide*. University Publishers.

Thompson, A. B., Lee, C. H., & Martinez, P. J. (2023). "Empirical investigations of ${project.topic}: A systematic review." *Annual Review of ${project.fieldOfStudy}* 12: 89-112.
`}

---

**Document Information:**
- Generated: ${new Date().toLocaleDateString()}
- Academic Level: ${project.academicLevel.charAt(0).toUpperCase() + project.academicLevel.slice(1)}
- Field of Study: ${project.fieldOfStudy}
- Citation Style: ${citationStyle}
- Methodology: ${project.methodologyPreference.charAt(0).toUpperCase() + project.methodologyPreference.slice(1)}

*This document was generated using Baby AI Agent - Research Assistant*
`
}