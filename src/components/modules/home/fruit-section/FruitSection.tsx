import AllFriutsContainer from "./AllFriutsContainer";
import CategoryCards from "./CategoryCards";

const FruitSection = () => {
  return (
    <div className="mb-10 md:mb-16 lg:mb-20 mt-6">
      <CategoryCards />
      <AllFriutsContainer />
    </div>
  );
};

export default FruitSection;
