export const Criteria_Reasons = Object.freeze({
    submission_volume : "Below minimum Submission Volume",
    approval_rate: "Below minimum Approvals in PA requests",
    treatment_guideline_adherence: "Lack of prior necessary diagnosis",
    patient_satisfaction: "Lack of necesssary healthcare services",
    recovery_rate:"Lack of medical necessity",
    cost_efficiency: "Out of Policy Coverage"
});


export const GOLDCARD_LEVELS = Object.freeze({
    Basic: 'basic',
    Advanced: 'advanced',
    Premier: 'premier'
})


export function determineLevel(criteriaList, property, value) {
    const count = criteriaList.filter(item => item[property] === value).length;
    if (count == criteriaList.length) {
      return GOLDCARD_LEVELS.Premier;
    } else if (count >= 1 && count < criteriaList.length) {
      return GOLDCARD_LEVELS.Advanced;
    } else {
      return GOLDCARD_LEVELS.Basic;
    }
  }