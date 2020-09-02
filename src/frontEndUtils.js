export const feedFilter = (jobs, filter, searchTerm) => {
  if (searchTerm.length) {
    jobs = jobs.filter(job =>
      job.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  switch (filter) {
    case 'paid':
      return jobs.filter(job => job.status === 'paid');
    case 'unpaid':
      return jobs.filter(job => job.status === 'unpaid');
    default:
      return jobs;
  }
};
