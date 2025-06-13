import FruitDetails from "@/components/modules/fruits/FruitDetails";

const FruitDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  return (
    <div className="my-4 md:my-6">
      <FruitDetails id={id} />
    </div>
  );
};

export default FruitDetailsPage;
