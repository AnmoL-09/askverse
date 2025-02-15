import { motion } from "framer-motion";

const QnADisplay = ({ qna }) => {
  return (
    <div className="mt-5 p-4 border rounded-lg bg-gray-100 dark:bg-gray-800">
      <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">
        Generated Questions & Answers
      </h2>
      {qna.length > 0 ? (
        qna.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-3 p-3 bg-white dark:bg-gray-700 rounded-lg shadow-md"
          >
            <p className="text-gray-800 dark:text-gray-300">
              <strong>Q{index + 1}: </strong> {item.question}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              <strong>A: </strong> {item.answer}
            </p>
          </motion.div>
        ))
      ) : (
        <p className="text-gray-500">No Q&A generated yet.</p>
      )}
    </div>
  );
};

export default QnADisplay;
