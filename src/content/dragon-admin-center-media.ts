import environmentPicker from "../assets/DAC Documentation/Environment picker.png";
import organizationTree from "../assets/DACScreens/OrgTree.png";
import organizationSearch from "../assets/DACScreens/OrgTreeSearched.png";
import addOrganizationUnit from "../assets/DACScreens/AddOrgUnit.png";
import changeParent from "../assets/DACScreens/AddOrgUnitParentChange.png";
import removeInitial from "../assets/DACScreens/Remove user data - initial.png";
import removeSelected from "../assets/DACScreens/Remove user data - users selected.png";
import removeLoading from "../assets/DACScreens/Remove user data - loading.png";
import removeCompleted from "../assets/DACScreens/Remove user data - removed.png";
import removeInProgress from "../assets/DACScreens/Remove user data - in progress.png";
import removeError from "../assets/DACScreens/Remove user data - error.png";
import ehrInitial from "../assets/DACScreens/Add user EHR IDs.png";
import ehrSelected from "../assets/DACScreens/Add User EHR IDs - selected.png";
import ehrAdded from "../assets/DACScreens/Roles page.png";
import contentPatterns from "../assets/dragon-admin-center/content-patterns-menu.png";
import contentExample from "../assets/dragon-admin-center/content-pattern-example.png";
import interactionPatterns from "../assets/dragon-admin-center/interaction-patterns-menu.png";
import interactionExample from "../assets/dragon-admin-center/interaction-pattern-example.png";
import uxWorkflows from "../assets/dragon-admin-center/ux-workflows.png";
import uxAnnotations from "../assets/dragon-admin-center/ux-annotations.png";
import accessibilitySpecification from "../assets/dragon-admin-center/accessibility-specification.png";
import accessibilityAnnotations from "../assets/dragon-admin-center/accessibility-annotations.png";

export const environmentSlides = [
  {
    src: environmentPicker,
    alt: "The environment picker lists Default, Production, and Test environments, with Default selected.",
  },
];

export const organizationSlides = [
  {
    src: organizationTree,
    alt: "An expanded organization tree displays multiple levels of organizational units.",
    caption:
      "The org tree shows multiple levels of hierarchy. I wanted something simple and clear that could serve as both a visual representation of the structure and a way to navigate the site.",
  },
  {
    src: organizationSearch,
    alt: "Organization search results appear in a flat list, with a breadcrumb identifying each unit's place in the hierarchy.",
    caption:
      "With organizations potentially very large, I designed search results as a flat list. To maintain context, I added a breadcrumb under each name describing where the unit is in the structure.",
  },
  {
    src: addOrganizationUnit,
    alt: "The Add organization unit drawer requests a name and a parent organizational unit.",
    caption:
      "Adding an organization is simple: just a name and a parent are required.",
  },
  {
    src: changeParent,
    alt: "The Change parent drawer lets an admin select a new parent in the organizational hierarchy.",
    caption:
      "While we included drag and drop to modify the hierarchy, we also needed an accessible alternative. This change-parent drawer provides a straightforward way to edit the hierarchy, with the same search functionality as the page.",
  },
];

export const removalSlides = [
  {
    src: removeInitial,
    alt: "The Remove user data drawer before any users have been selected.",
    caption: "The initial state of the drawer.",
  },
  {
    src: removeSelected,
    alt: "A confirmation dialog appears over the Remove user data drawer with multiple users selected for removal.",
    caption:
      "The drawer with users selected and a confirmation before removal.",
  },
  {
    src: removeLoading,
    alt: "A status table lists user-data removal operations in progress.",
    caption:
      "Removal has been initiated, with each operation showing a status. More operations can be initiated if desired.",
  },
  {
    src: removeCompleted,
    alt: "The removal status table shows completed operations and a dismiss action.",
    caption:
      "Both operations have completed. They can be cleared using the dismiss button.",
  },
  {
    src: removeInProgress,
    alt: "A message bar on the Organization page indicates that user-data removal is still in progress.",
    caption:
      "A message bar reminds the admin that removal is in progress and explains its implications.",
  },
  {
    src: removeError,
    alt: "An error toast states that one or more users could not be deleted and offers a View details link.",
    caption: "A toast appears when an operation has failed.",
  },
];

export const ehrSlides = [
  {
    src: ehrInitial,
    alt: "The Add user EHR IDs drawer has a PeoplePicker and an add button before users are selected.",
    caption:
      "I created a custom component that modified Fluent's PeoplePicker, placing an add button next to it to allow selection and addition of users without confirming the action yet.",
  },
  {
    src: ehrSelected,
    alt: "Selected users appear in the PeoplePicker and the add button is enabled.",
    caption: "Once users are selected, the add button becomes enabled.",
  },
  {
    src: ehrAdded,
    alt: "Added users appear in editable rows with blank EHR user ID fields.",
    caption:
      "Once added, the user appears below with a blank EHR user ID field. Rows can be removed and more users added before submitting the panel.",
  },
];

export const processImages = {
  contentPatterns: {
    src: contentPatterns,
    alt: "A documentation menu lists the content patterns included in the admin-center audit.",
    caption: "The content patterns I documented.",
  },
  contentExample: {
    src: contentExample,
    alt: "An audit of user-details pages compares content patterns across Microsoft admin centers.",
    caption: "An example of one of the content patterns documented.",
  },
  interactionPatterns: {
    src: interactionPatterns,
    alt: "A documentation menu lists the interaction patterns included in the audit.",
    caption: "The interaction patterns I documented.",
  },
  interactionExample: {
    src: interactionExample,
    alt: "An audit compares list behavior and interaction patterns across admin-center interfaces.",
    caption: "An example of one of the interaction patterns documented.",
  },
  uxWorkflows: {
    src: uxWorkflows,
    alt: "UX specification screens are arranged into annotated workflow sections.",
    caption: "Examples of workflows documented in sections, with annotations.",
  },
  uxAnnotations: {
    src: uxAnnotations,
    alt: "An annotated environment screen documents behavior and developer handoff details.",
    caption: "An example of an annotated screen within the workflow.",
  },
  accessibilitySpecification: {
    src: accessibilitySpecification,
    alt: "An accessibility specification documents the environments experience.",
    caption: "An example of an accessibility specification.",
  },
  accessibilityAnnotations: {
    src: accessibilityAnnotations,
    alt: "Numbered tab stops and accessibility annotations describe screen navigation.",
    caption:
      "An example of annotations within the accessibility specification.",
  },
};
